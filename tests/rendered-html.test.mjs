import assert from "node:assert/strict";
import test, { before, after } from "node:test";

let runtime;
before(async () => {
  process.env.WRANGLER_WRITE_LOGS = "false";
  process.env.WRANGLER_LOG_PATH = ".wrangler/logs";
  process.env.MINIFLARE_REGISTRY_PATH = ".wrangler/registry";
  const { createTestHarness } = await import("wrangler");
  runtime = createTestHarness({
    workers: [{ configPath: new URL("../dist/server/wrangler.json", import.meta.url) }],
  });
  await runtime.listen();
});
after(async () => { await runtime?.close(); });

async function render(path = "/", options = {}) {
  return runtime.getWorker().fetch(
    `${options.origin ?? "http://localhost"}${path}`, {
      method: options.method ?? "GET",
      redirect: "manual",
      headers: { accept: "text/html", ...options.headers },
    },
  );
}

test("usa nonce aleatório e protege as respostas HTML", async () => {
  const first = await render("/", { origin: "https://portfolio.caiovfaria07.workers.dev", headers: { "Content-Security-Policy": "script-src 'nonce-attacker'" } });
  const policy = first.headers.get("content-security-policy");
  const nonce = policy?.match(/'nonce-([^']+)'/)?.[1];
  assert.ok(nonce);
  assert.notEqual(nonce, "attacker");
  assert.doesNotMatch(policy, /script-src[^;]*unsafe-inline|'unsafe-eval'/);
  const html = await first.text();
  const scripts = [...html.matchAll(/<script\b([^>]*)>/g)];
  assert.ok(scripts.length > 0);
  for (const [, attrs] of scripts) assert.ok(attrs.includes(`nonce="${nonce}"`), "script sem nonce");
  assert.equal(first.headers.get("x-content-type-options"), "nosniff");
  assert.equal(first.headers.get("x-frame-options"), "DENY");
  assert.equal(first.headers.get("strict-transport-security"), "max-age=31536000");
  assert.equal(first.headers.get("cache-control"), "no-store");
  const second = await render();
  assert.notEqual(second.headers.get("content-security-policy"), policy);
  assert.equal(second.headers.get("strict-transport-security"), null);
});

test("redireciona HTTP público preservando caminho e parâmetros", async () => {
  const response = await render("/orcamento?solucao=landing", { origin: "http://portfolio.caiovfaria07.workers.dev" });
  assert.equal(response.status, 308);
  assert.equal(response.headers.get("location"), "https://portfolio.caiovfaria07.workers.dev/orcamento?solucao=landing");
  const asset = await render("/brand/cvf-monogram-white.svg", { origin: "http://portfolio.caiovfaria07.workers.dev" });
  assert.equal(asset.status, 308);
  assert.equal(asset.headers.get("location"), "https://portfolio.caiovfaria07.workers.dev/brand/cvf-monogram-white.svg");
});

test("protege arquivos públicos e não expõe arquivos internos", async () => {
  const asset = await render("/brand/cvf-monogram-white.svg");
  assert.equal(asset.status, 200);
  assert.equal(asset.headers.get("x-content-type-options"), "nosniff");
  assert.match(asset.headers.get("content-security-policy"), /sandbox/);
  for (const path of ["/.env", "/.dev.vars", "/worker/index.ts", "/.git/config"]) {
    assert.equal((await render(path)).status, 404, path);
  }
});

test("recusa escrita sem endpoint e URLs remotas no otimizador", async () => {
  const response = await render("/", { method: "POST" });
  assert.equal(response.status, 405);
  assert.equal(response.headers.get("allow"), "GET, HEAD");
  for (const source of ["https://example.com/a.png", "//example.com/a.png", "/\\example.com/a.png"]) {
    const image = await render(`/_vinext/image?url=${encodeURIComponent(source)}&w=640&q=75`);
    assert.equal(image.status, 400);
    assert.equal(image.headers.get("x-content-type-options"), "nosniff");
  }
});

test("renderiza o portfólio completo", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Soluções digitais que transformam visitas em clientes/i);
  assert.match(html, /Projetos em destaque/i);
  assert.match(html, /Barbearia Norte/i);
  assert.match(html, /Pizzaria Fornalha/i);
  assert.match(html, /Agenda aberta/i);
  assert.doesNotMatch(html, /5 vagas/i);
  assert.match(html, /Ver estudo completo/i);
  assert.match(html, /pizzaria-fornalha-balcao\.webp/i);
  assert.match(html, /Landing page/i);
  assert.match(html, /Site institucional/i);
  assert.match(html, /Sistema web/i);
  assert.match(html, /projects-sequence/i);
  assert.doesNotMatch(html, /Mostrar próximo projeto/i);
  assert.match(html, /O próximo projeto de destaque pode ser/i);
  assert.match(html, /Espaço reservado para a sua ideia/i);
  assert.doesNotMatch(html, /class="concept-number">03/i);
  assert.match(html, /O que eu consigo criar para o seu negócio/i);
  assert.match(html, /Enviar mensagem/i);
  assert.match(html, /Sua privacidade importa/i);
  assert.match(html, /Continuar para o Instagram/i);
  assert.match(html, /Política de Privacidade completa/i);
  assert.match(html, /Copiar resumo do projeto/i);
  assert.doesNotMatch(html, /WhatsApp/i);
  assert.doesNotMatch(html, /wa\.me/i);
  assert.match(html, /Sem uma solução própria/i);
  assert.match(html, /Conte sobre o seu negócio/i);
});

test("separa os preços e o simulador na página de orçamento", async () => {
  const home = await (await render()).text();
  assert.match(home, /href="\/orcamento"/i);
  assert.match(home, /Solicitar orçamento/i);
  for (const solution of ["landing", "institucional"]) {
    assert.match(home, new RegExp(`href="/orcamento\\?solucao=${solution}#orcamento"`));
  }
  assert.doesNotMatch(home, /class="quote-section"/i);
  assert.doesNotMatch(home, /R\$ 800|R\$ 1\.700/i);
  const response = await render("/orcamento");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.doesNotMatch(html, /class="service-grid"/i);
  assert.doesNotMatch(html, /Escolha o ponto de partida/i);
  assert.match(html, /O orçamento final depende do escopo/i);
  assert.match(html, /Monte uma primeira versão do seu projeto/i);
  assert.match(html, /Fluxo de contato avançado/i);
  assert.match(html, /Sistema web — indisponível no momento/i);
  assert.match(html, /<button[^>]*disabled=""[^>]*>Sistema web<\/button>/);
  assert.match(html, /Não inclui desenvolvimento de backend/i);
  assert.match(html, /Prioridade/i);
  assert.match(html, /valor normal/i);
  assert.match(html, /−10%/i);
  assert.match(html, /href="\/#contato"/i);
});

test("explica o uso dos dados na política de privacidade", async () => {
  const response = await render("/privacidade");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Política de Privacidade/i);
  assert.match(html, /não envia nem armazena/i);
  assert.match(html, /nome do visitante/i);
  assert.match(html, /Instagram/i);
  assert.match(html, /direitos sobre seus dados/i);
  assert.match(html, /01 de outubro de 2026/i);
});

test("inicia o orçamento com a solução indicada na URL", async () => {
  for (const [solution, label] of [["landing", "Landing page"], ["institucional", "Site institucional"], ["sistema", "Site institucional"], ["invalida", "Site institucional"]]) {
    const response = await render(`/orcamento?solucao=${solution}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(`<button[^>]*aria-pressed="true"[^>]*>${label}</button>`));
  }
});

test("renderiza a página completa sobre Caio", async () => {
  const response = await render("/sobre");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Minha trajetória/i);
  assert.match(html, /caio-viana-portfolio-v2\.webp/i);
  assert.match(html, /LandLytics/i);
  assert.match(html, /Peneiras On/i);
  assert.match(html, /NEXT 2026/i);
  assert.match(html, /peneirason\.vercel\.app/i);
  assert.match(html, /Norte Barbearia e Clube/i);
  assert.match(html, /Pizzaria Fornalha/i);
  assert.match(html, /caio-faria-6aab253b6/i);
  assert.match(html, /Inglês em formação/i);
});

test("mantém o menu no resumo e liga Saber mais à página completa", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /href="#sobre"[^>]*>Sobre</i);
  assert.match(html, /href="\/sobre"[^>]*>Saber mais sobre mim/i);
});

test("renderiza os estudos completos dos projetos", async () => {
  for (const [path, project, image] of [["/projetos/barbearia", "Barbearia Norte", "barbearia-menu.webp"], ["/projetos/pizzaria", "Pizzaria Fornalha", "pizzaria-fornalha-balcao.webp"]]) {
    const response = await render(path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(project, "i"));
    assert.match(html, /O que precisava ser resolvido/i);
    assert.match(html, /O projeto vai além da aparência/i);
    assert.match(html, /Demonstração do projeto/i);
    assert.match(html, /Quero algo semelhante/i);
    assert.match(html, /Do desafio à entrega/i);
    assert.match(html, /O que o projeto demonstra/i);
    assert.match(html, /O caminho do cliente/i);
    assert.match(html, /sem métricas/i);
    assert.match(html, path.endsWith("barbearia") ? /Escolher o agendamento/ : /Revisar o pedido/);
    assert.doesNotMatch(html, /WhatsApp/i);
    assert.doesNotMatch(html, /wa\.me/i);
    assert.match(html, new RegExp(`<title>${project} \\| Projeto CVF</title>`, "i"));
    assert.match(html, new RegExp(image.replace(".", "\\."), "i"));
  }
});

test("não publica elementos temporários do modelo inicial", async () => {
  const response = await render();
  const html = await response.text();

  assert.doesNotMatch(html, /codex-preview/i);
  assert.doesNotMatch(html, /Your site is taking shape/i);
  assert.doesNotMatch(html, /react-loading-skeleton/i);
});

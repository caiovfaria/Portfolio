import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

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
  assert.match(html, /pizzaria-menu\.webp/i);
  assert.match(html, /Landing page/i);
  assert.match(html, /Site institucional/i);
  assert.match(html, /Sistema web/i);
  assert.match(html, /projects-sequence/i);
  assert.doesNotMatch(html, /Mostrar próximo projeto/i);
  assert.match(html, /O próximo projeto de destaque pode ser/i);
  assert.match(html, /Espaço reservado para a sua ideia/i);
  assert.doesNotMatch(html, /class="concept-number">03/i);
  assert.match(html, /O que eu consigo criar para o seu negócio/i);
  assert.match(html, /Monte uma primeira versão do seu projeto/i);
  assert.match(html, /Fluxo de contato avançado/i);
  assert.match(html, /Enviar mensagem/i);
  assert.match(html, /Sua privacidade importa/i);
  assert.match(html, /Continuar para o Instagram/i);
  assert.match(html, /Política de Privacidade completa/i);
  assert.match(html, /Copiar resumo do projeto/i);
  assert.doesNotMatch(html, /WhatsApp/i);
  assert.doesNotMatch(html, /wa\.me/i);
  assert.match(html, /Prioridade/i);
  assert.match(html, /valor normal/i);
  assert.match(html, /−10%/i);
  assert.match(html, /Sem uma solução própria/i);
  assert.match(html, /Conte sobre o seu negócio/i);
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
  for (const [path, project, image] of [["/projetos/barbearia", "Barbearia Norte", "barbearia-menu.webp"], ["/projetos/pizzaria", "Pizzaria Fornalha", "pizzaria-menu.webp"]]) {
    const response = await render(path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(project, "i"));
    assert.match(html, /O que precisava ser resolvido/i);
    assert.match(html, /O projeto vai além da aparência/i);
    assert.match(html, /Demonstração do projeto/i);
    assert.match(html, /Quero algo semelhante/i);
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

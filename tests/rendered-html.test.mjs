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
  assert.match(html, /Sites e sistemas que transformam visitas em clientes/i);
  assert.match(html, /Projetos em destaque/i);
  assert.match(html, /Barbearia Norte/i);
  assert.match(html, /Pizzaria Fornalha/i);
  assert.match(html, /Agenda aberta/i);
  assert.match(html, /Ver estudo completo/i);
  assert.match(html, /pizzaria-menu\.png/i);
  assert.match(html, /Landing page/i);
  assert.match(html, /Site institucional/i);
  assert.match(html, /Sistema web/i);
  assert.match(html, /Mostrar próximo projeto/i);
  assert.match(html, /O que eu consigo criar para o seu negócio/i);
  assert.match(html, /Monte uma primeira versão do seu projeto/i);
  assert.match(html, /WhatsApp básico já está incluído/i);
  assert.match(html, /WhatsApp avançado/i);
  assert.match(html, /Prioridade/i);
  assert.match(html, /valor normal/i);
  assert.match(html, /−10%/i);
  assert.match(html, /Sem uma solução própria/i);
  assert.match(html, /Conte sobre o seu negócio/i);
});

test("renderiza os estudos completos dos projetos", async () => {
  for (const [path, project, image] of [["/projetos/barbearia", "Barbearia Norte", "barbearia-menu.png"], ["/projetos/pizzaria", "Pizzaria Fornalha", "pizzaria-menu.png"]]) {
    const response = await render(path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(project, "i"));
    assert.match(html, /O que precisava ser resolvido/i);
    assert.match(html, /O projeto vai além da aparência/i);
    assert.match(html, /Demonstração do projeto/i);
    assert.match(html, /Quero algo semelhante/i);
    assert.match(html, new RegExp(`<title>${project} \\| Projeto C\\.Vian</title>`, "i"));
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

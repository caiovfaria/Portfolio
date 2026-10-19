# Revisão inicial — 2026-10-08

Escopo: código do portfólio, auditoria de dependências e requisições HTTP/HTTPS de leitura ao domínio oficial. Não é pentest nem garantia de ausência de vulnerabilidades. Nenhuma mudança de segurança foi publicada.

## Evidências

- HTTPS respondeu 200. HTTP também respondeu 200 sem redirecionamento na requisição verificada: configurar e confirmar redirect no ambiente oficial.
- Na resposta HTTPS HEAD não foram observados CSP, HSTS, X-Content-Type-Options, Referrer-Policy ou Permissions-Policy. Avaliar configuração na resposta final do Worker/host, com CSP compatível com scripts de hidratação e model-viewer; validar no navegador antes de aplicar.
- npm audit: 30 entradas de pacotes afetados (1 baixa, 6 moderadas, 23 altas, 0 críticas). Entradas incluem dependências transitivas e propagação, não 30 explorações confirmadas no site.
- Dependências diretas sinalizadas: @cloudflare/vite-plugin, @next/eslint-plugin-next, drizzle-kit, react-server-dom-webpack, vinext, vite e wrangler. Analisar advisories e caminho de uso/produção antes de atualizar; não usar audit fix --force indiscriminadamente.
- ContactBrief monta texto e copia para clipboard. Não há envio de formulário ao servidor nesse componente. QuoteSimulator calcula no cliente; não deve ser usado como fonte confiável de preço em futura API de pagamento.
- .env* está ignorado pelo Git. A busca inicial não identificou uso de process.env nos componentes app; isso não equivale a uma varredura completa do histórico Git ou detecção de todos os segredos.
- Não encontrados arquivos de rotas API na busca inicial em app/worker. O Worker contém otimizador de imagens e handler do framework; sua segurança depende também das bibliotecas.

## Implementação local — 2026-10-08

Aplicada com a skill cvf-web-design. Nenhuma publicação, push ou alteração de configuração remota nesta etapa.

### Corrigido e testado localmente

- O Worker redireciona HTTP público para HTTPS (308), preservando caminho e parâmetros. localhost, 127.0.0.1 e ::1 continuam funcionando com HTTP local. `run_worker_first` faz a proteção cobrir também arquivos estáticos, servidos pelo binding ASSETS.
- Respostas HTML têm CSP com nonce criptográfico de 144 bits novo por resposta. A política da requisição é substituída antes de chegar ao framework: o visitante não escolhe o nonce. Todos os scripts do HTML renderizado foram conferidos pelo teste. HTML usa no-store para evitar compartilhar nonces em cache.
- CSP limita conexões ao próprio site, bloqueia objetos, handlers JavaScript inline, submissão nativa de formulários e enquadramento do portfólio por terceiros. Os estudos podem enquadrar somente os projetos do domínio caiovfaria.github.io.
- WebAssembly é permitido especificamente para model-viewer (`wasm-unsafe-eval`); JavaScript eval permanece bloqueado. Styles inline continuam permitidos por necessidade do React e do componente 3D: não confundir com scripts inline livres.
- nosniff, Referrer-Policy, X-Frame-Options e Permissions-Policy aplicados. HSTS em HTTPS público por um ano, sem preload/includeSubDomains. `_headers` cobre assets com CSP restritiva/sandbox, inclusive SVG quando aberto como documento.
- Apenas GET/HEAD entram no servidor; métodos de escrita retornam 405 antes de processar o corpo. Isto é pertinente ao portfólio atual sem Server Actions/API. Quando adicionar envio real, autenticação ou pagamento, revisar esta regra e implementar validação, autorização e limites adequados no endpoint.
- Testes recusam URLs externas/protocol-relative no otimizador e verificam 404 para .env, .dev.vars, código do Worker e .git/config.
- `.dev.vars*` passa a ser ignorado junto de `.env*`. Busca por padrões de algumas credenciais privadas em app, worker, public, .github, db e examples não encontrou ocorrências. Busca de extensões sensíveis/mapas em public também não encontrou. Não foi feita auditoria completa do histórico Git nem detecção universal de segredos.

### Dependências

Atualizados em conjunto React/React DOM/RSC para 19.3.0; vinext 1.0.1, Vite 8.3.4, plugin RSC 0.5.34, plugin Cloudflare 1.63.0 e Wrangler 4.148.0. Ferramentas Next ESLint 16.4.0 e drizzle-kit 0.31.11 também atualizadas. Dependências transitivas sinalizadas receberam atualizações dentro das faixas permitidas. Overrides pontuais: sharp 0.35.5; fflate 0.7.5 somente sob satori e @shuding/opentype.js. Reavaliar overrides quando os pacotes ascendentes adotarem essas correções.

Auditoria completa após as mudanças: **11 entradas, 4 moderadas e 7 altas** (antes: 30). Não são 11 explorações confirmadas.

- **Pendente:** braces 3.0.3, ainda versão latest verificada, sem versão corrigida indicada. Aviso de exaustão de pilha com padrões profundamente aninhados. Propaga via micromatch/fast-glob, lint e plugins de build do vinext. Não identificada entrada de padrões de usuários nessas ferramentas no portfólio. Não aceitar código/configuração/padrões não confiáveis no processo de build.
- **Pendente:** esbuild antigo via @esbuild-kit/esm-loader de drizzle-kit (4 entradas propagadas). Este caminho serve a ferramenta de migração do template, não o formulário. Não abrir seu servidor de desenvolvimento para terceiros. Não aplicado downgrade incompatível nem override forçado de esbuild.
- Não eliminar scaffolding de banco/examples apenas para fazer o scanner ficar verde: não estão configurados como APIs públicas do portfólio.
- Os advisories de RSC, Vite, sharp e fflate anteriormente apontados não aparecem na auditoria final. Ainda não há base para prometer ausência total de vulnerabilidades.

### Verificações executadas

- `npm test`: build completo e **11/11 testes aprovados**, agora usando o harness local do Wrangler e chamada direta ao Worker (mesmo runtime/config gerados para produção).
- ESLint dos arquivos novos/alterados de segurança, testes e configuração: aprovado. `git diff --check`: aprovado. Não declarar lint global limpo; havia erros preexistentes de interface fora deste escopo.
- Prévia local do build de produção: home/intro/logo 3D, troca PT→EN e orçamento landing com valores em dólar. Console sem erros/avisos na verificação final. A primeira verificação encontrou erro de WebAssembly da CSP; corrigido antes da segunda verificação.
- Não feito teste de carga, pentest, auditoria jurídica ou medição de desempenho nesta etapa.

### Não aplicável / próximos passos

O formulário monta texto no navegador, sem envio ou armazenamento no servidor. CAPTCHA, validação de API e limites de envio não são necessários nesse fluxo. Bloqueio de métodos não equivale a proteção completa contra DDoS; controles de tráfego do host podem ser avaliados separadamente se houver abuso. Templates de autenticação e banco não são autenticação válida para novos serviços sem revisão própria.

**Pendente em produção:** após autorização para publicar, conferir GET/HEAD HTTP e HTTPS, incluindo assets, headers, logo 3D, idioma, formulário/clipboard, iframe e orçamento no domínio oficial. Os headers publicados e o redirecionamento oficial ainda refletem a versão anterior; testes locais não comprovam a configuração final do host.

### Fontes consultadas

- https://developers.cloudflare.com/workers/static-assets/headers/
- https://developers.cloudflare.com/workers/static-assets/binding/
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/script-src
- https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html
- https://react.dev/versions
- npm audit/npm view e implementação instalada do vinext para propagação do nonce ao SSR.

## Publicação autorizada — 2026-10-08

Versão Cloudflare: `691cd2f4-e086-4e5d-a523-1d1144574a32`, Worker `portfolio`.

- Publicação concluída após autorização do usuário, seguindo a revisão da skill cvf-web-design.
- GET oficial: home e estudo da barbearia 200; CSP com nonce, HSTS e nosniff observados.
- HTTP oficial: orçamento com parâmetros e SVG da marca responderam 308 para o mesmo caminho em HTTPS.
- GLB oficial respondeu 200 com headers de assets.
- Navegador no oficial: home e logo 3D exibidos, console sem erros/avisos nesta verificação. Os 11 testes locais aprovados continuam sendo a evidência dos fluxos detalhados; não houve novo teste exaustivo de todos os fluxos em produção.
- Os 11 alertas residuais descritos acima permanecem. Publicação não equivale a garantia de segurança absoluta.
- Código registrado em commit local. Não enviar automaticamente para main enquanto o workflow legado de GitHub Pages publica a pasta dist inteira, que agora inclui artefatos do servidor; o destino oficial desta publicação é exclusivamente Cloudflare.

## Publicação das melhorias visuais — 2026-10-08

- Autorização explícita do usuário: “pode upar ja”.
- Worker `portfolio`, versão `02858c7f-36b9-421f-9d1e-f609b37ea1e5`.
- Build e 12 testes aprovados antes do deploy, incluindo a seleção inicial do orçamento pela URL.
- GET HTTPS em home, Sobre, dois estudos e orçamento com `solucao=landing`: 200 e headers CSP/nosniff presentes.
- Conteúdo novo dos estudos confirmado nas duas rotas; seleção inicial de Landing page confirmada no HTML publicado.
- Inclui transições, cards interativos, prévia do orçamento, narrativa dos estudos, microinterações, traduções e bordas arredondadas. Sem alterações nas proteções do Worker.
- Não realizado teste visual exaustivo em produção nesta entrega. Os riscos residuais de dependências registrados anteriormente permanecem; sem push para o workflow legado de GitHub Pages.

## Atualização da captura da pizzaria — 2026-10-17

- Autorização explícita para publicar a imagem nova no destaque e no estudo da pizzaria.
- Worker `portfolio`, versão `7b12190d-fe71-4ca9-a819-743fd024df9c`; versão anterior `01f0da00-cd85-48cc-967d-4b6f853a72f3` mantida no histórico da Cloudflare.
- Build e 12 testes aprovados na preparação. Comparação pré-publicação em cinco rotas: HTML idêntico ao público, exceto a imagem/alt solicitados, origem local e identificadores aleatórios. As três folhas de estilo eram byte a byte idênticas às públicas; melhorias antigas preservadas.
- Nova imagem confirmada por GET no destaque e no estudo. Navegador confirmou o destaque publicado. Sem alterações nas proteções do Worker e sem push para o workflow legado de GitHub Pages.

## Nova identidade de balcão da Fornalha — 2026-10-17

- Autorização explícita: “pode atualiza ja e no portfolio tbm”.
- Nova captura `pizzaria-fornalha-balcao.webp` (80.996 bytes), atualizada no destaque, estudo e respectivos metadados. Imagens anteriores preservadas.
- Build e 12 testes aprovados. Comparação pré-publicação das cinco rotas e três folhas CSS confirmou que só a imagem/alt autorizados mudavam no HTML normalizado.
- Worker `portfolio`, versão `1b857b9d-c435-4f58-a40f-4373d77ed4d3`, anterior `7b12190d-fe71-4ca9-a819-743fd024df9c`.
- Destaque inspecionado no navegador público, imagem carregada; estudo confirmado por GET. Proteções e demais elementos preservados.
- Pizzaria publicada separadamente no GitHub Pages, commit `620f7cbbbf1a3a50c292cdaac02f747e8be82236`; workflow `39000878026` concluído com sucesso. Dois seletores de sabores e recálculo conferidos no navegador público. Os 17 testes da pizzaria passaram na preparação.

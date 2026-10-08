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

## Próximos passos recomendados

Priorizar análise e atualização testada das dependências com avisos de alta severidade, verificar exposição de handlers do framework e configurar HTTPS/headers. Não considerar o projeto liberado por esta revisão inicial. Toda publicação continua dependendo de autorização explícita.

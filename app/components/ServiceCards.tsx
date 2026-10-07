const services = [
  { code: "LP", title: "Landing page", description: "Página estratégica para apresentar uma oferta e gerar contatos.", price: "R$ 800", features: ["Design responsivo", "Integração com canais de contato", "Publicação e orientação"] },
  { code: "SI", title: "Site institucional", description: "Presença profissional para explicar serviços e construir confiança.", price: "R$ 1.700", features: ["Até 5 páginas", "SEO técnico básico", "Formulário e métricas"] },
  { code: "SW", title: "Sistema web", description: "Solução personalizada para organizar processos do seu negócio.", price: "Sob orçamento", features: ["Escopo personalizado", "Painel administrativo", "Treinamento e suporte"] },
];

export default function ServiceCards({ showPrices = false }: { showPrices?: boolean }) {
  return <div className="service-grid">{services.map((service) => (
    <article key={service.code} className={service.code === "SI" ? "recommended" : undefined}>
      {service.code === "SI" && <em>MAIS INDICADO</em>}
      <div className="service-icon">{service.code}</div>
      <h3>{service.title}</h3><p>{service.description}</p>
      {showPrices && <><small>{service.code === "SW" ? "Investimento" : "A partir de"}</small><strong>{service.price}</strong></>}
      <ul>{service.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
      <a href={`/orcamento?solucao=${service.code === "LP" ? "landing" : service.code === "SI" ? "institucional" : "sistema"}#orcamento`}>Solicitar orçamento <span aria-hidden="true">→</span></a>
    </article>
  ))}</div>;
}

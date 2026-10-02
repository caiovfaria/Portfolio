import Image from "next/image";

const projects = [
  {
    name: "Barbearia Norte",
    category: "Site institucional + agendamento",
    description: "Uma experiência imersiva para apresentar serviços, fortalecer a marca e transformar visitas em agendamentos rápidos.",
    image: "/projects/barbearia-menu.png",
    imageAlt: "Tela inicial em modo escuro do site Barbearia Norte",
    tags: ["Site institucional", "Agendamento", "Identidade premium"],
    caseUrl: "/projetos/barbearia",
    liveUrl: "https://caiovfaria.github.io/Landing-Page-Barbearia/",
    accent: "barber",
  },
  {
    name: "Pizzaria Fornalha",
    category: "Cardápio e sistema de pedidos",
    description: "Um fluxo completo para encontrar sabores, personalizar produtos e concluir pedidos com clareza em qualquer tela.",
    image: "/projects/pizzaria-menu.png",
    imageAlt: "Tela do menu principal da Pizzaria Fornalha",
    tags: ["React", "Cardápio online", "Sistema de pedidos"],
    caseUrl: "/projetos/pizzaria",
    liveUrl: "https://caiovfaria.github.io/Pizzaria/",
    accent: "pizza",
  },
] as const;

export default function FeaturedProjects() {
  return (
    <div className="projects-showcase">
      <div className="projects-sequence" aria-label="Projetos em destaque">
        {projects.map((project, index) => (
          <article className="featured-carousel featured-project-card" key={project.name}>
            <div className="carousel-topline">
              <span>PROJETO 0{index + 1}</span>
              <p><b>0{index + 1}</b><i>/</i>0{projects.length}</p>
            </div>

            <div className={`featured-slide ${project.accent}`}>
              <div className="featured-visual">
                <div className="featured-frame">
                  <div className="featured-browser-bar"><i /><i /><i /><span>PROJETO AO VIVO</span></div>
                  <div className="featured-screen">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      sizes="(max-width: 900px) 100vw, 65vw"
                      priority={index === 0}
                      unoptimized
                    />
                  </div>
                </div>
                <span className="featured-watermark" aria-hidden="true">0{index + 1}</span>
                <span className="featured-status"><i /> DEMONSTRAÇÃO DISPONÍVEL</span>
              </div>

              <div className="featured-content">
                <p className="featured-category">{project.category}</p>
                <h3>{project.name}</h3>
                <p className="featured-description">{project.description}</p>
                <ul aria-label={`Características de ${project.name}`}>
                  {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
                <div className="featured-actions">
                  <a className="featured-primary" href={project.caseUrl}>Ver estudo completo <span>→</span></a>
                  <a className="featured-secondary" href={project.liveUrl} target="_blank" rel="noreferrer">Abrir ao vivo <span>↗</span></a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <article className="project-concept project-invitation">
        <div className="concept-copy">
          <p className="concept-kicker"><i aria-hidden="true" /> ESPAÇO RESERVADO PARA A SUA IDEIA</p>
          <h3>O próximo projeto de destaque pode ser <strong>o seu.</strong></h3>
          <span>Vamos transformar sua ideia em uma solução digital clara, marcante e pronta para gerar resultados.</span>
        </div>
        <a className="text-link" href="#contato">Quero criar meu projeto</a>
      </article>
    </div>
  );
}

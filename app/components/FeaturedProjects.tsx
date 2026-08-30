"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

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

export default function FeaturedProjects({ contactUrl }: { contactUrl: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "previous">("next");
  const activeProject = projects[activeIndex];

  const showProject = useCallback((index: number, nextDirection?: "next" | "previous") => {
    setDirection(nextDirection ?? (index > activeIndex ? "next" : "previous"));
    setActiveIndex(index);
  }, [activeIndex]);

  const move = useCallback((step: number) => {
    const nextIndex = (activeIndex + step + projects.length) % projects.length;
    showProject(nextIndex, step > 0 ? "next" : "previous");
  }, [activeIndex, showProject]);

  return (
    <div className="projects-showcase">
      <div
        className="featured-carousel"
        role="region"
        aria-roledescription="carrossel"
        aria-label="Projetos em destaque"
      >
        <div className="carousel-topline">
          <span>CASE EM EXIBIÇÃO</span>
          <p><b>0{activeIndex + 1}</b><i>/</i>0{projects.length}</p>
        </div>

        <article
          key={`${activeIndex}-${direction}`}
          className={`featured-slide direction-${direction} ${activeProject.accent}`}
          aria-roledescription="slide"
          aria-label={`${activeIndex + 1} de ${projects.length}: ${activeProject.name}`}
        >
          <div className="featured-visual">
            <div className="featured-frame">
              <div className="featured-browser-bar"><i /><i /><i /><span>PROJETO AO VIVO</span></div>
              <div className="featured-screen">
                <Image
                  src={activeProject.image}
                  alt={activeProject.imageAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 65vw"
                  priority
                  unoptimized
                />
              </div>
            </div>
            <span className="featured-watermark" aria-hidden="true">0{activeIndex + 1}</span>
            <span className="featured-status"><i /> DEMONSTRAÇÃO DISPONÍVEL</span>
          </div>

          <div className="featured-content">
            <p className="featured-category">{activeProject.category}</p>
            <h3>{activeProject.name}</h3>
            <p className="featured-description">{activeProject.description}</p>
            <ul aria-label="Características do projeto">
              {activeProject.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
            <div className="featured-actions">
              <a className="featured-primary" href={activeProject.caseUrl}>Ver estudo completo <span>→</span></a>
              <a className="featured-secondary" href={activeProject.liveUrl} target="_blank" rel="noreferrer">Abrir ao vivo <span>↗</span></a>
            </div>
          </div>
        </article>

        <div className="carousel-controls">
          <button type="button" onClick={() => move(-1)} aria-label="Mostrar projeto anterior"><span>←</span><small>ANTERIOR</small></button>
          <div className="carousel-indicators" aria-label="Escolher projeto">
            {projects.map((project, index) => (
              <button
                key={project.name}
                type="button"
                className={index === activeIndex ? "active" : ""}
                aria-label={`Mostrar ${project.name}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => showProject(index)}
              ><span /></button>
            ))}
          </div>
          <button type="button" onClick={() => move(1)} aria-label="Mostrar próximo projeto"><small>PRÓXIMO</small><span>→</span></button>
        </div>

        <p className="sr-only" aria-live="polite">Projeto exibido: {activeProject.name}</p>
      </div>

      <article className="project-concept project-invitation">
        <div className="concept-number">03</div>
        <div className="concept-copy"><p>PRÓXIMO PROJETO</p><h3>Uma solução pode ser criada para o seu negócio.</h3></div>
        <a className="text-link" href={contactUrl} target="_blank" rel="noreferrer">Conversar sobre uma ideia →</a>
      </article>
    </div>
  );
}

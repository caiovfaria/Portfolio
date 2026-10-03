"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const projects = [
  {
    name: "Barbearia Norte",
    type: "Site + agendamento",
    image: "/projects/barbearia-menu.webp",
    alt: "Tela inicial em modo escuro do site Barbearia Norte",
    href: "/projetos/barbearia",
  },
  {
    name: "Pizzaria Fornalha",
    type: "Cardápio + pedidos",
    image: "/projects/pizzaria-menu.webp",
    alt: "Tela do menu principal da Pizzaria Fornalha",
    href: "/projetos/pizzaria",
  },
];

export default function HeroShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let timer: number | undefined;
    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = undefined;
    };
    const start = () => {
      stop();
      if (document.visibilityState === "visible") {
        timer = window.setInterval(() => setActive((current) => (current + 1) % projects.length), 5200);
      }
    };

    start();
    document.addEventListener("visibilitychange", start);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", start);
    };
  }, []);

  const current = projects[active];

  return (
    <div className="hero-visual hero-showcase" role="group" aria-label="Demonstração dos projetos em computador e celular">
      <div className="browser-card showcase-browser">
        <div className="browser-bar"><i></i><i></i><i></i><span>cvf / projeto em destaque</span></div>
        <a className="showcase-screen" href={current.href} aria-label={`${current.type} ${current.name} Explorar projeto →`}>
          {projects.map((project, index) => (
            <Image key={project.name} className={index === active ? "active" : ""} src={project.image} alt={project.alt} fill sizes="(max-width: 900px) 100vw, 50vw" priority={index === 0} unoptimized />
          ))}
          <span className="showcase-overlay"><small>{current.type}</small><strong>{current.name}</strong><b>Explorar projeto →</b></span>
        </a>
      </div>
      <div className="phone-card showcase-phone" aria-hidden="true">
        <span>DEMONSTRAÇÃO</span><strong>{current.name}</strong><i>Experiência responsiva</i><i>Fluxo comercial claro</i>
      </div>
      <div className="showcase-switch" role="group" aria-label="Escolher projeto demonstrado">
        {projects.map((project, index) => (
          <button key={project.name} type="button" className={index === active ? "active" : ""} onClick={() => setActive(index)} aria-pressed={index === active}>
            <span>0{index + 1}</span>{project.name}
          </button>
        ))}
      </div>
    </div>
  );
}

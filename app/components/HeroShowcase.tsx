"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const projects = [
  {
    name: "Barbearia Norte",
    type: "Site + agendamento",
    image: "/projects/barbearia-menu.png",
    alt: "Tela inicial em modo escuro do site Barbearia Norte",
    href: "/projetos/barbearia",
  },
  {
    name: "Pizzaria Fornalha",
    type: "Cardápio + pedidos",
    image: "/projects/pizzaria-menu.png",
    alt: "Tela do menu principal da Pizzaria Fornalha",
    href: "/projetos/pizzaria",
  },
];

export default function HeroShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % projects.length), 5200);
    return () => window.clearInterval(timer);
  }, []);

  const current = projects[active];

  return (
    <div className="hero-visual hero-showcase" aria-label="Demonstração dos projetos em computador e celular">
      <div className="browser-card showcase-browser">
        <div className="browser-bar"><i></i><i></i><i></i><span>c.vian / projeto em destaque</span></div>
        <Link className="showcase-screen" href={current.href} aria-label={`Conhecer o projeto ${current.name}`}>
          {projects.map((project, index) => (
            <Image key={project.name} className={index === active ? "active" : ""} src={project.image} alt={project.alt} fill sizes="(max-width: 900px) 100vw, 50vw" priority={index === 0} unoptimized />
          ))}
          <span className="showcase-overlay"><small>{current.type}</small><strong>{current.name}</strong><b>Explorar projeto →</b></span>
        </Link>
      </div>
      <div className="phone-card showcase-phone" aria-hidden="true">
        <span>DEMONSTRAÇÃO</span><strong>{current.name}</strong><i>Experiência responsiva</i><i>Fluxo comercial claro</i>
      </div>
      <div className="showcase-switch" aria-label="Escolher projeto demonstrado">
        {projects.map((project, index) => (
          <button key={project.name} type="button" className={index === active ? "active" : ""} onClick={() => setActive(index)} aria-label={`Mostrar ${project.name}`} aria-pressed={index === active}>
            <span>0{index + 1}</span>{project.name}
          </button>
        ))}
      </div>
    </div>
  );
}

/* eslint-disable @next/next/no-html-link-for-pages */
import Image from "next/image";
import type { ProjectData } from "./project-data";

export default function ProjectDetail({ project }: { project: ProjectData }) {
  const whatsapp = `https://wa.me/5521999167694?text=${encodeURIComponent(`Olá! Vi o projeto ${project.name} no seu portfólio e gostaria de conversar sobre uma solução semelhante para o meu negócio.`)}`;

  return (
    <main className="detail-page">
      <header className="detail-header">
        <a className="brand" href="/" aria-label="Voltar ao portfólio">C.Vian<span>.dev</span></a>
        <a className="availability-pill" href={whatsapp} target="_blank" rel="noreferrer"><i></i> Agenda aberta · 2 vagas</a>
        <a className="detail-back" href="/#projetos">← Todos os projetos</a>
      </header>

      <section className="detail-hero">
        <div className="detail-hero-copy">
          <p>{project.eyebrow}</p>
          <h1>{project.headline}</h1>
          <span>{project.description}</span>
          <div className="detail-actions">
            <a className="button detail-primary" href={project.liveUrl} target="_blank" rel="noreferrer">Abrir projeto ao vivo ↗</a>
            <a className="button detail-secondary" href={whatsapp} target="_blank" rel="noreferrer">Quero algo semelhante</a>
          </div>
        </div>
        <div className={`detail-device ${project.slug}`}>
          <div className="detail-browser-bar"><i></i><i></i><i></i><span>Demonstração do projeto</span></div>
          <div className="detail-screen"><Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 900px) 100vw, 55vw" priority unoptimized /></div>
          <b>ROLAGEM AUTOMÁTICA</b>
        </div>
      </section>

      <section className="detail-summary" aria-label="Resumo do projeto">
        <div><small>TECNOLOGIAS</small><strong>{project.technologies}</strong></div>
        <div><small>PRAZO TÍPICO</small><strong>{project.timeline}</strong></div>
        <div><small>INDICADO PARA</small><strong>{project.audience}</strong></div>
      </section>

      <section className="detail-story">
        <div><p>01 · O DESAFIO</p><h2>O que precisava ser resolvido</h2><span>{project.challenge}</span></div>
        <div><p>02 · A SOLUÇÃO</p><h2>Como a experiência foi construída</h2><span>{project.solution}</span></div>
      </section>

      <section className="detail-features">
        <div className="detail-section-heading"><p>FUNCIONALIDADES</p><h2>O projeto vai além da aparência.</h2><span>Cada elemento tem uma função clara dentro da experiência do cliente.</span></div>
        <div className="detail-feature-grid">{project.features.map((feature, index) => <article key={feature}><b>0{index + 1}</b><strong>{feature}</strong></article>)}</div>
      </section>

      <section className="detail-process">
        <div className="detail-section-heading"><p>CONSTRUÇÃO</p><h2>Do problema até a publicação.</h2></div>
        <div>{project.steps.map(([number, label]) => <article key={number}><b>{number}</b><span>{label}</span></article>)}</div>
      </section>

      <section className="detail-cta">
        <div><p>PRÓXIMO PROJETO</p><h2>{project.nextName}</h2><a href={`/projetos/${project.nextSlug}`}>Conhecer este projeto →</a></div>
        <div><p>TEM UMA IDEIA?</p><h2>Vamos transformar em uma solução profissional.</h2><a href={whatsapp} target="_blank" rel="noreferrer">Conversar pelo WhatsApp →</a></div>
      </section>

      <footer className="detail-footer"><a className="brand" href="/">C.Vian<span>.dev</span></a><span>Projeto demonstrativo · 2026</span><a href="/">Voltar ao portfólio ↑</a></footer>
    </main>
  );
}

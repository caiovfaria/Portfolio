import type { Metadata } from "next";
import Image from "next/image";
import BrandLogo from "../components/BrandLogo";

export const metadata: Metadata = {
  title: "Sobre Caio Viana | CVF",
  description: "Conheça a trajetória, as experiências e as habilidades de Caio Viana, desenvolvedor web e aluno de Engenharia de Software na FIAP.",
};

export default function AboutPage() {
  return (
    <main className="about-page">
      <header className="about-page-header">
        <BrandLogo href="/" label="Voltar ao portfólio" />
        <a href="/#sobre">Voltar ao portfólio</a>
      </header>

      <section className="about-page-hero">
        <figure className="about-page-portrait">
          <Image src="/caio-viana-portfolio-v2.webp" alt="Caio Viana, desenvolvedor web e aluno de Engenharia de Software" fill sizes="(max-width: 900px) 100vw, 40vw" priority unoptimized />
          <figcaption><b>Caio Viana</b><span>Desenvolvimento web · Engenharia de Software</span></figcaption>
        </figure>

        <div className="about-page-intro">
          <p className="section-label">MINHA TRAJETÓRIA</p>
          <h1>Curiosidade para aprender. Compromisso para entregar.</h1>
          <p>Sou Caio Viana, aluno de Engenharia de Software na FIAP e desenvolvedor web. Gosto de transformar ideias em soluções digitais que sejam fáceis de entender, agradáveis de usar e úteis de verdade.</p>
          <p>Meu foco está em criar sites responsivos e experiências digitais para pequenos negócios, cuidando de cada etapa: planejamento, visual, desenvolvimento, testes e publicação.</p>
          <div className="about-page-tags"><span>Aluno FIAP</span><span>Desenvolvimento web</span><span>Projetos completos</span></div>
          <a className="about-linkedin-link" href="https://www.linkedin.com/in/caio-faria-6aab253b6/" target="_blank" rel="noreferrer">Ver meu perfil no LinkedIn <b aria-hidden="true">↗</b></a>
        </div>
      </section>

      <section className="about-page-story">
        <div className="about-page-heading"><p>EXPERIÊNCIA NA PRÁTICA</p><h2>O que já faz parte da minha caminhada</h2></div>
        <div className="about-page-grid">
          <article><small>01</small><h3>Projetos reais</h3><p>Desenvolvi experiências completas para uma barbearia e uma pizzaria, pensando tanto na apresentação da marca quanto no caminho do cliente até o agendamento ou pedido.</p></article>
          <article><small>02</small><h3>Formação e tecnologia</h3><p>Curso o segundo período do Bacharelado em Engenharia de Software na FIAP. Amplio minha base técnica e aplico HTML, CSS, JavaScript, React, TypeScript, Python, Git e GitHub em projetos próprios.</p></article>
          <article><small>03</small><h3>Vivências que somam</h3><p>Participei do Rio Innovation Week, fui sorteado pela FIAP para participar da BSides e criar novos contatos, tive um projeto reconhecido na Global Solution e levarei o Peneiras On ao NEXT 2026.</p></article>
          <article><small>04</small><h3>Trabalho em equipe</h3><p>Meus 11 anos no movimento escoteiro fortaleceram minha escuta, colaboração, responsabilidade e capacidade de encontrar soluções diante de imprevistos.</p></article>
        </div>
      </section>

      <section className="about-page-values">
        <div><p>COMO EU TRABALHO</p><h2>Entender antes de desenvolver.</h2></div>
        <p>Cada projeto começa pelo problema e pelas pessoas que vão usar a solução. A tecnologia entra como ferramenta para construir algo claro, funcional e preparado para evoluir.</p>
      </section>

      <section className="about-page-projects">
        <div className="about-page-heading"><p>PROJETOS E CONQUISTAS</p><h2>Ideias que transformei em algo real</h2></div>
        <div className="about-project-list">
          <article className="about-project-featured">
            <div><small>NEXT 2026 · FIAP</small><h3>Peneiras On</h3></div>
            <p>Plataforma criada para ampliar o acesso de jovens às peneiras de futebol, organizando inscrições, oportunidades próximas, convocações e avaliações feitas pelos olheiros. O Peneiras On será apresentado no NEXT 2026.</p>
            <a href="https://peneirason.vercel.app/" target="_blank" rel="noreferrer">Abrir projeto ao vivo ↗</a>
          </article>
          <article>
            <div><small>GLOBAL SOLUTION · FIAP</small><h3>LandLytics</h3></div>
            <p>Plataforma de análise térmica da superfície terrestre criada em equipe para mapear impactos ambientais próximos a data centers. O projeto trabalha com dados de satélite e indicadores ambientais como NDVI e LST, e recebeu reconhecimento de destaque acadêmico na FIAP.</p>
            <a href="https://www.linkedin.com/in/caio-faria-6aab253b6/" target="_blank" rel="noreferrer">Ver no LinkedIn ↗</a>
          </article>
          <article>
            <div><small>HTML · CSS · JAVASCRIPT</small><h3>Norte Barbearia e Clube</h3></div>
            <p>Site institucional criado do zero para uma barbearia, reunindo apresentação da marca, serviços, página de vendas, agendamento online e área de acesso.</p>
            <a href="/projetos/barbearia">Ver projeto →</a>
          </article>
          <article>
            <div><small>REACT · TYPESCRIPT · VITE</small><h3>Pizzaria Fornalha</h3></div>
            <p>Experiência responsiva com cardápio, escolha de pizzas salgadas e doces, opção meio a meio e personalização de tamanho, borda e adicionais.</p>
            <a href="/projetos/pizzaria">Ver projeto →</a>
          </article>
        </div>
      </section>

      <section className="about-page-skills">
        <div className="about-page-heading"><p>HABILIDADES</p><h2>Ferramentas que uso para tirar projetos do papel</h2></div>
        <div><span>HTML e CSS</span><span>JavaScript</span><span>React</span><span>TypeScript</span><span>Python</span><span>Git e GitHub</span><span>GitHub Actions</span><span>Vite</span><span>Tailwind CSS</span><span>npm e pnpm</span><span>Design responsivo</span><span>Publicação web</span><span>Inglês em formação · BRASAS</span></div>
      </section>

      <section className="about-page-cta">
        <p>VAMOS CONVERSAR?</p>
        <h2>Agora que você me conhece melhor, conte sobre a sua ideia.</h2>
        <div><a href="/#contato">Falar sobre um projeto →</a><a className="about-page-cta-secondary" href="https://www.linkedin.com/in/caio-faria-6aab253b6/" target="_blank" rel="noreferrer">Acessar LinkedIn ↗</a></div>
      </section>

      <footer className="about-page-footer"><BrandLogo href="/" label="Voltar ao portfólio" /><p>Soluções digitais para pequenos negócios.</p><a href="/">Voltar ao início</a></footer>
    </main>
  );
}

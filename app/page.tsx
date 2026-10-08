import ContactBrief from "./components/ContactBrief";
import FeaturedProjects from "./components/FeaturedProjects";
import HeroShowcase from "./components/HeroShowcase";
import ServiceCards from "./components/ServiceCards";
import BrandLogo from "./components/BrandLogo";
import BrandSeal from "./components/BrandSeal";
import SiteHeader from "./components/SiteHeader";
import BrandIntro from "./components/BrandIntro";

export default function Home() {
  return (
    <main>
      <BrandIntro />
      <SiteHeader />
      <section className="hero" id="inicio">
        <div className="hero-copy">
          <span className="availability-pill hero-availability"><i></i> Agenda aberta para novos projetos</span>
          <p className="eyebrow">Soluções digitais para pequenos negócios</p>
          <h1>Soluções digitais que transformam visitas em clientes.</h1>
          <p className="lead">Soluções rápidas, responsivas e pensadas para apresentar seu negócio, facilitar contatos, pedidos e agendamentos.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#projetos">Ver projetos</a>
          </div>
          <div className="hero-trust" aria-label="Diferenciais">
            <span>✓ Entrega organizada</span><span>✓ Contato simplificado</span><span>✓ Foco em resultados</span>
          </div>
          <div className="hero-signature" aria-hidden="true"><b><BrandSeal /></b><span>CLAREZA<br/>PERFORMANCE<br/>CONVERSÃO</span></div>
        </div>
        <HeroShowcase />
      </section>

      <section className="feature-strip" aria-label="Vantagens">
        <article><span>01</span><div><strong>Agilidade</strong><p>Prioridades claras e entregas por etapas, sem perder qualidade.</p></div></article>
        <article><span>02</span><div><strong>Contato inteligente</strong><p>Menos atrito entre o interesse do visitante e a conversa certa.</p></div></article>
        <article><span>03</span><div><strong>Seguro e confiável</strong><p>Boas práticas, testes e cuidado com dados em cada entrega.</p></div></article>
        <article><span>04</span><div><strong>Foco em conversão</strong><p>Cada seção orienta o visitante a pedir, agendar ou entrar em contato.</p></div></article>
      </section>

      <section className="section projects-section" id="projetos">
        <div className="section-heading"><p>PORTFÓLIO</p><h2>Projetos em destaque</h2><span>Soluções criadas para problemas reais de pequenos negócios.</span></div>
        <FeaturedProjects />
      </section>

      <section className="section capabilities-section" id="solucoes">
        <div className="section-heading"><p>POSSIBILIDADES</p><h2>O que eu consigo criar para o seu negócio</h2><span>Funcionalidades que podem ser combinadas em uma solução simples ou em um sistema completo.</span></div>
        <div className="capability-grid">
          {[
            ["AG", "Agendamento", "Horários, profissionais, confirmação e organização de reservas."],
            ["CP", "Catálogo de produtos", "Produtos, categorias, preços e pedidos fáceis de atualizar."],
            ["PA", "Painel administrativo", "Controle centralizado das informações importantes do negócio."],
            ["LG", "Área do cliente", "Login, histórico, dados pessoais e conteúdos exclusivos."],
            ["PD", "Pedidos online", "Montagem, revisão e envio completo do pedido."],
            ["CT", "Contato inteligente", "Mensagens e informações organizadas para facilitar o atendimento."],
            ["PG", "Pagamentos", "Integração para cobranças, assinaturas ou vendas online."],
            ["GS", "Gestão de serviços", "Clientes, status, orçamento e acompanhamento de processos."],
          ].map(([code, title, description], index) => <article key={code}><div><b>{code}</b><small>0{index + 1}</small></div><h3>{title}</h3><p>{description}</p></article>)}
        </div>
      </section>

      <section className="section services-section" id="servicos">
        <div className="section-heading"><p>SERVIÇOS</p><h2>Escolha o ponto de partida</h2><span>Escopos claros que podem evoluir junto com o seu negócio.</span></div>
        <ServiceCards />
      </section>


      <section className="comparison-section">
        <div className="comparison-heading"><p>ANTES / DEPOIS</p><h2>Uma presença digital muda a forma como o negócio é percebido.</h2></div>
        <div className="comparison-board">
          <div className="comparison-column before"><header><span>—</span><strong>Sem uma solução própria</strong></header><ul><li>Atendimento espalhado e repetitivo</li><li>Informações difíceis de encontrar</li><li>Dependência total das redes sociais</li><li>Clientes desistem no caminho</li><li>Processos feitos manualmente</li></ul></div>
          <div className="comparison-switch" aria-hidden="true"><b><BrandSeal /></b><span>TRANSFORMA</span></div>
          <div className="comparison-column after"><header><span>+</span><strong>Com uma solução bem construída</strong></header><ul><li>Solicitações organizadas</li><li>Serviços e preços apresentados com clareza</li><li>Presença digital própria e profissional</li><li>Caminho rápido até o contato ou pedido</li><li>Rotinas simplificadas e automatizadas</li></ul></div>
        </div>
      </section>

      <section className="process-section">
        <div className="section-heading"><p>PROCESSO</p><h2>Como eu trabalho</h2><span>Você acompanha cada etapa, sem surpresas.</span></div>
        <div className="process-grid">
          {[['01','Entendimento','Objetivos, público e prioridades.'],['02','Planejamento','Estrutura, conteúdo e prazo.'],['03','Design','Visualização antes do desenvolvimento.'],['04','Desenvolvimento','Site rápido e responsivo.'],['05','Entrega','Publicação, testes e suporte.']].map(([n,t,d])=><article key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p></article>)}
        </div>
      </section>

      <section className="section about-teaser" id="sobre">
        <div className="about-teaser-copy">
          <p className="section-label">SOBRE MIM</p>
          <h2>Aprendizado constante, projetos reais e atenção aos detalhes.</h2>
          <p>Sou Caio Viana, aluno de Engenharia de Software na FIAP e desenvolvedor web. Transformo o que estudo em soluções digitais claras, úteis e pensadas para resolver necessidades reais.</p>
        </div>
        <div className="about-teaser-action">
          <span>Conheça minha trajetória, experiências, habilidades e o que me inspira a criar.</span>
          <a className="about-more-link" href="/sobre">Saber mais sobre mim <b aria-hidden="true">→</b></a>
        </div>
      </section>

      <ContactBrief />

      <footer><BrandLogo href="#inicio" /><p>Soluções digitais para pequenos negócios.</p><div><a href="#projetos">Projetos</a><a href="#solucoes">Soluções</a><a href="/orcamento">Orçamento</a><a href="#sobre">Sobre</a><a href="/privacidade">Privacidade</a></div><small>© 2026 CVF. Projeto de portfólio.</small></footer>
    </main>
  );
}

import Image from "next/image";
import ContactBrief from "./components/ContactBrief";
import HeroShowcase from "./components/HeroShowcase";
import QuoteSimulator from "./components/QuoteSimulator";
import BrandLogo from "./components/BrandLogo";
import SiteHeader from "./components/SiteHeader";

export default function Home() {
  const wa = (message: string) => `https://wa.me/5521999167694?text=${encodeURIComponent(message)}`;
  const whatsapp = wa("Olá! Vi seu portfólio e gostaria de conversar sobre um projeto para o meu negócio.");
  const landingWhatsapp = wa("Olá! Vi o serviço de Landing Page no seu portfólio e gostaria de conversar sobre a criação de uma landing page para o meu negócio.");
  const institutionalWhatsapp = wa("Olá! Vi o serviço de Site Institucional no seu portfólio e gostaria de conversar sobre a criação de um site institucional para o meu negócio.");
  const systemWhatsapp = wa("Olá! Vi o serviço de Sistema Web no seu portfólio e gostaria de conversar sobre uma solução personalizada para o meu negócio.");
  return (
    <main>
      <div className="identity-rail" aria-hidden="true">C.V — DIGITAL / 2026</div>
      <SiteHeader whatsapp={whatsapp} />
      <section className="hero" id="inicio">
        <div className="hero-copy">
          <a className="availability-pill hero-availability" href={whatsapp} target="_blank" rel="noreferrer"><i></i> Agenda aberta · 2 vagas para novos projetos</a>
          <p className="eyebrow">Desenvolvimento web para pequenos negócios</p>
          <h1>Sites e sistemas que transformam visitas em clientes.</h1>
          <p className="lead">Soluções rápidas, responsivas e integradas ao WhatsApp para apresentar seu negócio e facilitar novos pedidos e agendamentos.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#projetos">Ver projetos</a>
          </div>
          <div className="hero-trust" aria-label="Diferenciais">
            <span>✓ Entrega organizada</span><span>✓ Integração com WhatsApp</span><span>✓ Foco em resultados</span>
          </div>
          <div className="hero-signature" aria-hidden="true"><b>C.V</b><span>CLAREZA<br/>PERFORMANCE<br/>CONVERSÃO</span></div>
        </div>
        <HeroShowcase />
      </section>

      <section className="feature-strip" aria-label="Vantagens">
        <article><span>01</span><div><strong>Agilidade</strong><p>Prazos claros e contato próximo.</p></div></article>
        <article><span>02</span><div><strong>WhatsApp integrado</strong><p>O caminho mais rápido até você.</p></div></article>
        <article><span>03</span><div><strong>Seguro e confiável</strong><p>Boas práticas em cada entrega.</p></div></article>
        <article><span>04</span><div><strong>Foco em conversão</strong><p>Design pensado para gerar contatos.</p></div></article>
      </section>

      <section className="section projects-section" id="projetos">
        <div className="section-heading"><p>PORTFÓLIO</p><h2>Projetos em destaque</h2><span>Soluções demonstrativas criadas para problemas reais de pequenos negócios.</span></div>
        <div className="project-grid">
          <article className="project-card">
            <div className="project-preview project-screenshot barber"><Image src="/projects/barbearia-menu.png" alt="Tela inicial em modo escuro do site Barbearia Norte" fill sizes="(max-width: 900px) 100vw, 50vw" priority unoptimized/><span className="project-image-label">Barbearia Norte</span><span className="project-demo-status">DEMONSTRAÇÃO DISPONÍVEL</span></div>
            <div className="project-info">
              <div><span>Site institucional</span><span>Agendamento</span></div><h3>Barbearia Norte</h3><p>Apresentação de serviços, profissionais e agendamento rápido pelo celular.</p>
              <div className="project-actions"><a href="/projetos/barbearia">Ver estudo completo →</a><a href="https://caiovfaria.github.io/Landing-Page-Barbearia/" target="_blank" rel="noreferrer">Abrir ao vivo ↗</a></div>
              <details className="case-study"><summary>Ver estudo do projeto <b>+</b></summary><div className="case-study-content"><div><small>PROBLEMA</small><p>Transformar uma barbearia de bairro em uma marca digital mais confiável e facilitar o agendamento.</p></div><div><small>SOLUÇÃO</small><p>Site imersivo, serviços claros, catálogo de produtos e chamada direta para reserva.</p></div><ul><li>Experiência responsiva</li><li>Agendamento rápido</li><li>Catálogo comercial</li><li>Identidade premium</li></ul><div className="case-meta"><span><b>HTML · CSS · JAVASCRIPT</b>Tecnologias</span><span><b>7–10 DIAS</b>Prazo típico</span></div></div></details>
            </div>
          </article>
          <article className="project-card">
            <div className="project-preview project-screenshot pizza"><Image src="/projects/pizzaria-menu.png" alt="Tela do menu principal da Pizzaria Fornalha" fill sizes="(max-width: 900px) 100vw, 50vw" unoptimized/><span className="project-image-label">Pizzaria Fornalha</span><span className="project-demo-status">DEMONSTRAÇÃO DISPONÍVEL</span></div>
            <div className="project-info">
              <div><span>Cardápio online</span><span>Sistema de pedidos</span></div><h3>Pizzaria Fornalha</h3><p>Cardápio organizado, personalização e montagem completa do pedido.</p>
              <div className="project-actions"><a href="/projetos/pizzaria">Ver estudo completo →</a><a href="https://caiovfaria.github.io/Pizzaria/" target="_blank" rel="noreferrer">Abrir ao vivo ↗</a></div>
              <details className="case-study"><summary>Ver estudo do projeto <b>+</b></summary><div className="case-study-content"><div><small>PROBLEMA</small><p>Organizar muitos sabores e opções sem tornar o pedido confuso ou demorado.</p></div><div><small>SOLUÇÃO</small><p>Fluxo completo para escolher, personalizar, revisar e concluir cada pedido.</p></div><ul><li>15 sabores cadastrados</li><li>Favoritos e busca</li><li>Personalização do pedido</li><li>Resumo e finalização</li></ul><div className="case-meta"><span><b>REACT · TYPESCRIPT · VITE</b>Tecnologias</span><span><b>3–5 SEMANAS</b>Prazo típico</span></div></div></details>
            </div>
          </article>
          <article className="project-card project-concept">
            <div className="concept-number">03</div><div className="concept-copy"><p>Próximo projeto</p><h3>Uma solução pode ser criada para o seu negócio.</h3></div><a className="text-link" href={whatsapp} target="_blank" rel="noreferrer">Conversar sobre uma ideia →</a>
          </article>
        </div>
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
            ["WA", "WhatsApp inteligente", "Mensagens prontas com informações escolhidas pelo cliente."],
            ["PG", "Pagamentos", "Integração para cobranças, assinaturas ou vendas online."],
            ["GS", "Gestão de serviços", "Clientes, status, orçamento e acompanhamento de processos."],
          ].map(([code, title, description], index) => <article key={code}><div><b>{code}</b><small>0{index + 1}</small></div><h3>{title}</h3><p>{description}</p></article>)}
        </div>
      </section>

      <section className="section services-section" id="servicos">
        <div className="section-heading"><p>SERVIÇOS</p><h2>Escolha o ponto de partida</h2><span>Escopos claros que podem evoluir junto com o seu negócio.</span></div>
        <div className="service-grid">
          <article><div className="service-icon">LP</div><h3>Landing page</h3><p>Página estratégica para apresentar uma oferta e gerar contatos.</p><small>A partir de</small><strong>R$ 1.200</strong><ul><li>Design responsivo</li><li>Integração com WhatsApp</li><li>Publicação e orientação</li></ul><a href={landingWhatsapp} target="_blank" rel="noreferrer">Quero uma landing page →</a></article>
          <article className="recommended"><em>MAIS INDICADO</em><div className="service-icon">SI</div><h3>Site institucional</h3><p>Presença profissional para explicar serviços e construir confiança.</p><small>A partir de</small><strong>R$ 2.500</strong><ul><li>Até 5 páginas</li><li>SEO técnico básico</li><li>Formulário e métricas</li></ul><a href={institutionalWhatsapp} target="_blank" rel="noreferrer">Quero um site institucional →</a></article>
          <article><div className="service-icon">SW</div><h3>Sistema web</h3><p>Solução personalizada para organizar processos do seu negócio.</p><small>Investimento</small><strong>Sob orçamento</strong><ul><li>Escopo personalizado</li><li>Painel administrativo</li><li>Treinamento e suporte</li></ul><a href={systemWhatsapp} target="_blank" rel="noreferrer">Quero um sistema web →</a></article>
        </div>
      </section>

      <QuoteSimulator />

      <section className="comparison-section">
        <div className="comparison-heading"><p>ANTES / DEPOIS</p><h2>Uma presença digital muda a forma como o negócio é percebido.</h2></div>
        <div className="comparison-board">
          <div className="comparison-column before"><header><span>—</span><strong>Sem uma solução própria</strong></header><ul><li>Atendimento espalhado e repetitivo</li><li>Informações difíceis de encontrar</li><li>Dependência total das redes sociais</li><li>Clientes desistem no caminho</li><li>Processos feitos manualmente</li></ul></div>
          <div className="comparison-switch" aria-hidden="true"><b>C.V</b><span>TRANSFORMA</span></div>
          <div className="comparison-column after"><header><span>+</span><strong>Com uma solução bem construída</strong></header><ul><li>Solicitações organizadas</li><li>Serviços e preços apresentados com clareza</li><li>Presença digital própria e profissional</li><li>Caminho rápido até o contato ou pedido</li><li>Rotinas simplificadas e automatizadas</li></ul></div>
        </div>
      </section>

      <section className="process-section">
        <div className="section-heading"><p>PROCESSO</p><h2>Como eu trabalho</h2><span>Você acompanha cada etapa, sem surpresas.</span></div>
        <div className="process-grid">
          {[['01','Entendimento','Objetivos, público e prioridades.'],['02','Planejamento','Estrutura, conteúdo e prazo.'],['03','Design','Visualização antes do desenvolvimento.'],['04','Desenvolvimento','Site rápido e responsivo.'],['05','Entrega','Publicação, testes e suporte.']].map(([n,t,d])=><article key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p></article>)}
        </div>
      </section>

      <section className="section about-section" id="sobre">
        <div className="about-copy"><p className="section-label">SOBRE MIM</p><h2>Soluções simples, comunicação próxima e atenção aos detalhes.</h2><p>Sou desenvolvedor web freelancer e ajudo pequenos negócios a apresentarem melhor seus serviços, facilitarem o atendimento e construírem uma presença digital própria.</p><div className="about-points"><span>✓ Atendimento direto</span><span>✓ Soluções personalizadas</span><span>✓ Compromisso com prazos</span></div></div>
        <div className="about-card"><small>MEU COMPROMISSO</small><strong>Entender antes de desenvolver.</strong><p>Cada projeto começa pelo problema do negócio. A tecnologia vem depois, como ferramenta para criar uma solução útil.</p><div><b>100%</b><span>responsivo<br/>e personalizado</span></div></div>
      </section>

      <ContactBrief />

      <footer><BrandLogo href="#inicio" /><p>Sites e sistemas para pequenos negócios.</p><div><a href="#projetos">Projetos</a><a href="#solucoes">Soluções</a><a href="#orcamento">Orçamento</a><a href="#sobre">Sobre</a></div><small>© 2026 C.Vian. Projeto de portfólio.</small></footer>
    </main>
  );
}

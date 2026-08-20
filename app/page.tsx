export default function Home() {
  const wa = (message: string) => `https://wa.me/5521999167694?text=${encodeURIComponent(message)}`;
  const whatsapp = wa("Olá! Vi seu portfólio e gostaria de conversar sobre um projeto para o meu negócio.");
  const landingWhatsapp = wa("Olá! Vi o serviço de Landing Page no seu portfólio e gostaria de conversar sobre a criação de uma landing page para o meu negócio.");
  const institutionalWhatsapp = wa("Olá! Vi o serviço de Site Institucional no seu portfólio e gostaria de conversar sobre a criação de um site institucional para o meu negócio.");
  const systemWhatsapp = wa("Olá! Vi o serviço de Sistema Web no seu portfólio e gostaria de conversar sobre uma solução personalizada para o meu negócio.");
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Ir para o início">C.Vian<span>.dev</span></a>
        <nav aria-label="Navegação principal">
          <a href="#projetos">Projetos</a><a href="#servicos">Serviços</a><a href="#sobre">Sobre</a>
        </nav>
        <a className="button button-small" href={whatsapp} target="_blank" rel="noreferrer">Falar no WhatsApp</a>
      </header>
      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">Desenvolvimento web para pequenos negócios</p>
          <h1>Sites e sistemas que transformam visitas em clientes.</h1>
          <p className="lead">Soluções rápidas, responsivas e integradas ao WhatsApp para apresentar seu negócio e facilitar novos pedidos e agendamentos.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#projetos">Ver projetos</a>
          </div>
          <div className="hero-trust" aria-label="Diferenciais">
            <span>✓ Entrega organizada</span><span>✓ Integração com WhatsApp</span><span>✓ Foco em resultados</span>
          </div>
        </div>
        <div className="hero-visual" aria-label="Exemplo de site em computador e celular">
          <div className="browser-card">
            <div className="browser-bar"><i></i><i></i><i></i></div>
            <div className="demo-content">
              <small>Soluções digitais sob medida</small><strong>Seu negócio mais profissional.</strong>
              <p>Presença digital clara, rápida e confiável.</p><b>Quero um orçamento</b>
            </div>
          </div>
          <div className="phone-card">
            <span>SEU NEGÓCIO</span><strong>Mais fácil de encontrar.</strong><i>WhatsApp integrado</i><i>Design responsivo</i>
          </div>
        </div>
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
            <div className="project-preview barber"><div className="mini-browser"><small>BARBEARIA PRIME</small><b>Estilo que combina com você.</b><i>Agendar horário</i></div><div className="mini-phone">AGENDE<br/>ONLINE</div></div>
            <div className="project-info"><div><span>Site institucional</span><span>Agendamento</span></div><h3>Barbearia Prime</h3><p>Apresentação de serviços, profissionais e agendamento rápido pelo celular.</p><a href="#contato">Ver estudo do projeto →</a></div>
          </article>
          <article className="project-card">
            <div className="project-preview pizza"><div className="mini-browser"><small>PIZZARIA SABOR</small><b>Seu pedido, do seu jeito.</b><i>Ver cardápio</i></div><div className="mini-phone">PEDIDO<br/>FÁCIL</div></div>
            <div className="project-info"><div><span>Cardápio online</span><span>WhatsApp</span></div><h3>Pizzaria Sabor</h3><p>Cardápio organizado, montagem do pedido e envio direto para o WhatsApp.</p><a href="#contato">Ver estudo do projeto →</a></div>
          </article>
          <article className="project-card project-concept">
            <div className="concept-number">03</div><p>Próximo projeto</p><h3>Uma solução pode ser criada para o seu negócio.</h3><a className="text-link" href={whatsapp} target="_blank" rel="noreferrer">Conversar sobre uma ideia →</a>
          </article>
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

      <section className="contact-section" id="contato">
        <div><p>VAMOS CONVERSAR?</p><h2>Vamos tirar sua ideia do papel?</h2><span>Conte o que você precisa e receba uma orientação inicial sem compromisso.</span></div>
        <a className="contact-button" href={whatsapp} target="_blank" rel="noreferrer">Solicitar orçamento no WhatsApp →</a>
      </section>

      <footer><a className="brand" href="#inicio">C.Vian<span>.dev</span></a><p>Sites e sistemas para pequenos negócios.</p><div><a href="#projetos">Projetos</a><a href="#servicos">Serviços</a><a href="#sobre">Sobre</a></div><small>© 2026 C.Vian. Projeto de portfólio.</small></footer>
    </main>
  );
}

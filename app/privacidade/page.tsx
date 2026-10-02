import type { Metadata } from "next";
import BrandLogo from "../components/BrandLogo";

export const metadata: Metadata = {
  title: "Política de Privacidade | CVF",
  description: "Saiba como as informações são tratadas ao entrar em contato pelo portfólio CVF.",
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <header className="privacy-header">
        <BrandLogo href="/" label="Voltar ao portfólio" />
        <a href="/">Voltar ao portfólio</a>
      </header>

      <section className="privacy-hero">
        <p>TRANSPARÊNCIA E CUIDADO</p>
        <h1>Política de Privacidade</h1>
        <span>Esta página explica, de forma direta, o que acontece com as informações usadas para iniciar uma conversa sobre um projeto.</span>
        <small>Última atualização: 01 de outubro de 2026</small>
      </section>

      <div className="privacy-content">
        <aside aria-label="Resumo da política">
          <b>RESUMO RÁPIDO</b>
          <p>O formulário monta um texto no seu próprio navegador.</p>
          <p>O portfólio não envia nem armazena esse conteúdo em banco de dados.</p>
          <p>Você escolhe se deseja abrir o Instagram e enviar a mensagem.</p>
        </aside>

        <article>
          <section>
            <span>01</span>
            <div><h2>Quem é responsável</h2><p>Este portfólio é administrado por Caio Viana de Faria, sob a marca CVF, responsável pelas decisões relacionadas ao uso das informações recebidas diretamente durante o atendimento.</p></div>
          </section>

          <section>
            <span>02</span>
            <div><h2>Quais informações podem ser usadas</h2><p>Ao preparar o resumo do projeto, você pode informar o nome do visitante, o tipo de negócio, se já possui um site, o objetivo principal e detalhes da ideia. O preenchimento ocorre no seu navegador.</p></div>
          </section>

          <section>
            <span>03</span>
            <div><h2>Como o formulário funciona</h2><p>Quando você seleciona “Copiar resumo do projeto”, o texto é organizado e copiado para a área de transferência do seu aparelho. O site não possui uma base de dados para receber ou guardar o conteúdo preenchido.</p></div>
          </section>

          <section>
            <span>04</span>
            <div><h2>Contato pelo Instagram</h2><p>Antes de abrir o Instagram, o site apresenta um aviso de privacidade. A conversa só é enviada se você continuar, colar o resumo e confirmar o envio dentro do Instagram. A partir dessa etapa, o tratamento das informações também segue as regras e a política de privacidade da Meta.</p></div>
          </section>

          <section>
            <span>05</span>
            <div><h2>Finalidade e conservação</h2><p>As informações enviadas voluntariamente na conversa serão usadas para entender a necessidade, responder dúvidas, preparar uma orientação inicial ou elaborar um orçamento. Elas poderão ser mantidas pelo tempo necessário para o atendimento, para cumprir obrigações legais ou para proteger direitos, e serão eliminadas quando não houver mais uma finalidade legítima para mantê-las.</p></div>
          </section>

          <section>
            <span>06</span>
            <div><h2>Dados técnicos e cookies</h2><p>Este portfólio não usa cookies próprios de publicidade nem ferramentas próprias de rastreamento de marketing. O serviço de hospedagem pode processar dados técnicos básicos, como endereço IP, navegador, horário de acesso e registros de segurança, para entregar e proteger o site.</p></div>
          </section>

          <section>
            <span>07</span>
            <div><h2>Compartilhamento e segurança</h2><p>As informações recebidas diretamente não são vendidas. Elas podem passar por serviços necessários ao contato e à operação do site, como Instagram/Meta e a infraestrutura de hospedagem, cada um sujeito às suas próprias medidas e políticas de segurança.</p></div>
          </section>

          <section>
            <span>08</span>
            <div><h2>Seus direitos sobre seus dados</h2><p>Você pode pedir informações sobre o uso dos seus dados e, quando aplicável, solicitar acesso, correção, eliminação ou revogação de consentimento. Para isso, entre em contato pelo perfil profissional no Instagram: <a href="https://www.instagram.com/c.vian_dev/" target="_blank" rel="noreferrer">@c.vian_dev</a>.</p></div>
          </section>

          <section>
            <span>09</span>
            <div><h2>Atualizações desta política</h2><p>Esta política pode ser atualizada para acompanhar mudanças no site, nos canais de atendimento ou nas regras aplicáveis. A data da versão mais recente sempre será exibida no início desta página.</p></div>
          </section>
        </article>
      </div>

      <footer className="privacy-footer">
        <BrandLogo href="/" label="Voltar ao portfólio" />
        <p>Privacidade explicada de forma simples.</p>
        <a href="/">Voltar ao portfólio</a>
      </footer>
    </main>
  );
}

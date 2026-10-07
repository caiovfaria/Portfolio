import BrandLogo from "../components/BrandLogo";
import QuoteSimulator from "../components/QuoteSimulator";
import "./budget.css";

export const metadata = {
  title: "Orçamento | Caio Viana",
  description: "Conheça os investimentos iniciais e simule uma solução digital para o seu negócio.",
};

export default function BudgetPage() {
  return <main className="budget-page">
    <header className="about-page-header"><BrandLogo href="/" label="Voltar ao portfólio" /><a href="/">Voltar ao portfólio</a></header>
    <section className="section budget-intro">
      <p className="section-label">ORÇAMENTO</p>
      <h1>Um investimento pensado para o seu negócio.</h1>
      <p>Conheça os valores iniciais e monte uma estimativa com as funcionalidades que você precisa.</p>
    </section>
    <QuoteSimulator />
    <p className="budget-disclaimer">Os valores são referências iniciais. O orçamento final depende do escopo, das integrações e do prazo combinado.</p>
    <section className="budget-contact"><h2>Vamos conversar sobre a sua ideia?</h2><p>Leve sua estimativa para a conversa e vamos definir juntos o melhor caminho.</p><a className="button button-dark" href="/#contato">Conte sobre o seu negócio <span aria-hidden="true">→</span></a></section>
    <footer className="about-page-footer"><BrandLogo href="/" label="Voltar ao portfólio" /><p>Soluções digitais para pequenos negócios.</p><a href="/">Voltar ao início</a></footer>
  </main>;
}

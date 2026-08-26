"use client";

import { useMemo, useState } from "react";

const projectTypes = [
  { id: "landing", label: "Landing page", base: 1200 },
  { id: "institucional", label: "Site institucional", base: 2500 },
  { id: "sistema", label: "Sistema web", base: 4500 },
] as const;

const additions = [
  { id: "whatsapp", label: "WhatsApp integrado", value: 250 },
  { id: "agendamento", label: "Agendamento online", value: 600 },
  { id: "catalogo", label: "Catálogo ou cardápio", value: 500 },
  { id: "pagamento", label: "Pagamento online", value: 1200 },
  { id: "painel", label: "Painel administrativo", value: 1500 },
  { id: "seo", label: "SEO e métricas", value: 350 },
] as const;

const formatMoney = (value: number) => new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
}).format(value);

export default function QuoteSimulator() {
  const [projectType, setProjectType] = useState<(typeof projectTypes)[number]["id"]>("institucional");
  const [selected, setSelected] = useState<string[]>(["whatsapp"]);
  const [deadline, setDeadline] = useState("normal");

  const estimate = useMemo(() => {
    const base = projectTypes.find((item) => item.id === projectType)?.base ?? 0;
    const extras = additions.filter((item) => selected.includes(item.id)).reduce((total, item) => total + item.value, 0);
    const urgency = deadline === "prioridade" ? 1.2 : 1;
    const minimum = Math.round((base + extras) * urgency / 50) * 50;
    return { minimum, maximum: Math.round(minimum * 1.25 / 50) * 50 };
  }, [deadline, projectType, selected]);

  const toggleAddition = (id: string) => {
    setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const selectedType = projectTypes.find((item) => item.id === projectType)?.label ?? "Projeto web";
  const selectedAdditions = additions.filter((item) => selected.includes(item.id)).map((item) => item.label);
  const message = [
    "Olá! Montei uma estimativa no seu portfólio.",
    `Projeto: ${selectedType}.`,
    `Funcionalidades: ${selectedAdditions.length ? selectedAdditions.join(", ") : "escopo básico"}.`,
    `Prazo: ${deadline === "prioridade" ? "prioridade" : deadline === "flexivel" ? "flexível" : "até 30 dias"}.`,
    `Estimativa inicial exibida: ${formatMoney(estimate.minimum)} a ${formatMoney(estimate.maximum)}.`,
    "Gostaria de conversar sobre o escopo.",
  ].join("\n");

  return (
    <section className="quote-section" id="orcamento">
      <div className="quote-intro">
        <p className="section-kicker">ESTIMATIVA INTERATIVA</p>
        <h2>Monte uma primeira versão do seu projeto.</h2>
        <p>Escolha o tipo de solução e as funções mais importantes. A faixa é inicial e fica exata depois de uma conversa rápida.</p>
        <div className="quote-seal" aria-hidden="true"><b>CV</b><span>PROJETO SOB MEDIDA</span></div>
      </div>

      <div className="quote-builder">
        <fieldset>
          <legend>1. Qual solução você precisa?</legend>
          <div className="choice-row">
            {projectTypes.map((item) => (
              <button type="button" key={item.id} className={projectType === item.id ? "selected" : ""} onClick={() => setProjectType(item.id)}>{item.label}</button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>2. O que ela deve fazer?</legend>
          <div className="feature-choices">
            {additions.map((item) => (
              <label key={item.id} className={selected.includes(item.id) ? "selected" : ""}>
                <input type="checkbox" checked={selected.includes(item.id)} onChange={() => toggleAddition(item.id)} />
                <span>{item.label}</span><b>{selected.includes(item.id) ? "✓" : "+"}</b>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>3. Qual é o prazo?</legend>
          <div className="choice-row compact">
            <button type="button" className={deadline === "flexivel" ? "selected" : ""} onClick={() => setDeadline("flexivel")}>Flexível</button>
            <button type="button" className={deadline === "normal" ? "selected" : ""} onClick={() => setDeadline("normal")}>Até 30 dias</button>
            <button type="button" className={deadline === "prioridade" ? "selected" : ""} onClick={() => setDeadline("prioridade")}>Prioridade</button>
          </div>
        </fieldset>

        <div className="quote-result" aria-live="polite">
          <div><small>Estimativa inicial</small><strong>{formatMoney(estimate.minimum)} <i>—</i> {formatMoney(estimate.maximum)}</strong><span>Valor sujeito à definição do escopo.</span></div>
          <a href={`https://wa.me/5521999167694?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer">Enviar projeto no WhatsApp →</a>
        </div>
      </div>
    </section>
  );
}

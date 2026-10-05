"use client";

import { useEffect, useMemo, useState } from "react";
import BrandSeal from "./BrandSeal";
import { translations } from "../translations";

const projectTypes = [
  { id: "landing", label: "Landing page", base: 800 },
  { id: "institucional", label: "Site institucional", base: 1700 },
  { id: "sistema", label: "Sistema web", base: 3100 },
] as const;

const additions = [
  { id: "contato", label: "Fluxo de contato avançado", value: 150 },
  { id: "agendamento", label: "Agendamento online", value: 400 },
  { id: "catalogo", label: "Catálogo ou cardápio", value: 350 },
  { id: "pagamento", label: "Pagamento online", value: 800 },
  { id: "painel", label: "Painel administrativo", value: 1000 },
  { id: "seo", label: "SEO e métricas", value: 200 },
] as const;

const formatMoney = (value: number, locale: "pt" | "en" = "pt") => new Intl.NumberFormat(locale === "en" ? "en-US" : "pt-BR", {
  style: "currency",
  currency: locale === "en" ? "USD" : "BRL",
  maximumFractionDigits: 0,
}).format(locale === "en" ? Math.round((value / 5) / 10) * 10 : value);

export default function QuoteSimulator() {
  const [locale, setLocale] = useState<"pt" | "en">("pt");
  const [projectType, setProjectType] = useState<(typeof projectTypes)[number]["id"]>("institucional");
  const [selected, setSelected] = useState<string[]>([]);
  const [deadline, setDeadline] = useState("normal");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const updateLocale = (event?: Event) => {
      const requested = (event as CustomEvent<{ locale?: "pt" | "en" }> | undefined)?.detail?.locale;
      setLocale(requested ?? (document.documentElement.lang === "en" ? "en" : "pt"));
    };

    updateLocale();
    window.addEventListener("cvf-language-change", updateLocale);
    return () => window.removeEventListener("cvf-language-change", updateLocale);
  }, []);

  const estimate = useMemo(() => {
    const base = projectTypes.find((item) => item.id === projectType)?.base ?? 0;
    const extras = additions.filter((item) => selected.includes(item.id)).reduce((total, item) => total + item.value, 0);
    const deadlineFactor = deadline === "prioridade" ? 1.2 : deadline === "flexivel" ? 0.9 : 1;
    const minimum = Math.round((base + extras) * deadlineFactor / 50) * 50;
    return { minimum, maximum: Math.round(minimum * 1.25 / 50) * 50 };
  }, [deadline, projectType, selected]);

  const toggleAddition = (id: string) => {
    setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const selectedType = projectTypes.find((item) => item.id === projectType)?.label ?? "Projeto web";
  const selectedAdditions = additions.filter((item) => selected.includes(item.id)).map((item) => item.label);
  const copyEstimate = () => {
    const english = document.documentElement.lang === "en";
    const translatedType = translations[selectedType] ?? selectedType;
    const translatedAdditions = selectedAdditions.map((item) => translations[item] ?? item);
    const message = english ? [
      "Hi! I prepared an estimate on your portfolio.",
      `Project: ${translatedType}.`,
      `Features: ${translatedAdditions.length ? translatedAdditions.join(", ") : "basic scope"}.`,
      `Timeline: ${deadline === "prioridade" ? "priority (+20%)" : deadline === "flexivel" ? "flexible (-10%)" : projectType === "sistema" ? "up to 30 days for the first functional version" : "up to 30 days"}.`,
      `Displayed initial estimate: ${formatMoney(estimate.minimum, "en")} to ${formatMoney(estimate.maximum, "en")}.`,
      "I would like to discuss the scope.",
    ].join("\n") : [
      "Olá! Montei uma estimativa no seu portfólio.",
      `Projeto: ${selectedType}.`,
      `Funcionalidades: ${selectedAdditions.length ? selectedAdditions.join(", ") : "escopo básico"}.`,
      `Prazo: ${deadline === "prioridade" ? "prioridade (+20%)" : deadline === "flexivel" ? "flexível (-10%)" : projectType === "sistema" ? "até 30 dias para a primeira versão funcional" : "até 30 dias"}.`,
      `Estimativa inicial exibida: ${formatMoney(estimate.minimum)} a ${formatMoney(estimate.maximum)}.`,
      "Gostaria de conversar sobre o escopo.",
    ].join("\n");
    navigator.clipboard.writeText(message)
      .then(() => setFeedback("Estimativa copiada. Use este resumo na sua próxima conversa."))
      .catch(() => setFeedback("Não foi possível copiar a estimativa automaticamente."));
  };

  return (
    <section className="quote-section" id="orcamento">
      <div className="quote-intro">
        <p className="section-kicker">ESTIMATIVA INTERATIVA</p>
        <h2>Monte uma primeira versão do seu projeto.</h2>
        <p>Escolha o tipo de solução e as funções mais importantes. O contato básico já está incluído; o fluxo avançado organiza mensagens e etapas personalizadas. A faixa fica exata depois de uma conversa rápida.</p>
        <div className="quote-seal" aria-hidden="true"><b><BrandSeal /></b><span>PROJETO SOB MEDIDA</span></div>
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
            <button type="button" className={deadline === "prioridade" ? "selected" : ""} onClick={() => setDeadline("prioridade")}>Prioridade <small>+20%</small></button>
            <button type="button" className={deadline === "normal" ? "selected" : ""} onClick={() => setDeadline("normal")}>Até 30 dias <small>valor normal</small></button>
            <button type="button" className={deadline === "flexivel" ? "selected" : ""} onClick={() => setDeadline("flexivel")}>Flexível <small>−10%</small></button>
          </div>
          {projectType === "sistema" && <p className="deadline-note">Para sistemas web, “até 30 dias” corresponde à primeira versão funcional.</p>}
        </fieldset>

        <div className="quote-result" aria-live="polite">
          <div><small>Estimativa inicial</small><strong>{formatMoney(estimate.minimum, locale)} <i>—</i> {formatMoney(estimate.maximum, locale)}</strong><span>Valor sujeito à definição do escopo.</span></div>
          <button type="button" onClick={copyEstimate}>Copiar estimativa →</button>
        </div>
        <p className="quote-feedback" aria-live="polite">{feedback}</p>
      </div>
    </section>
  );
}

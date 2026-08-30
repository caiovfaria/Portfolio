"use client";

import { FormEvent, useState } from "react";
import InstagramCta from "./InstagramCta";

export default function ContactBrief() {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [hasSite, setHasSite] = useState("Não");
  const [goal, setGoal] = useState("Conseguir mais clientes");
  const [details, setDetails] = useState("");
  const [feedback, setFeedback] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = [
      `Olá! Meu nome é ${name}.`,
      `Negócio: ${business}.`,
      `Já possui site: ${hasSite}.`,
      `Objetivo principal: ${goal}.`,
      `Detalhes: ${details || "Prefiro explicar durante a conversa."}`,
      "Gostaria de receber uma orientação inicial.",
    ].join("\n");
    navigator.clipboard.writeText(message)
      .then(() => setFeedback("Resumo copiado. Ele está pronto para ser enviado quando o Instagram estiver conectado."))
      .catch(() => setFeedback("Não foi possível copiar automaticamente. Selecione os dados preenchidos e tente novamente."));
  };

  return (
    <section className="brief-section" id="contato">
      <div className="brief-copy">
        <p>VAMOS CONVERSAR?</p>
        <h2>Conte sobre o seu negócio.</h2>
        <span>Responda quatro perguntas rápidas. Seu resumo ficará organizado para começar a conversa direto no que importa.</span>
        <div className="brief-note"><b>01</b><span>Sem compromisso<br/>Contato pelo Instagram em breve</span></div>
      </div>
      <form className="brief-form" onSubmit={submit}>
        <label><span>Seu nome</span><input value={name} onChange={(event) => setName(event.target.value)} placeholder="Como posso te chamar?" required /></label>
        <label><span>Seu negócio</span><input value={business} onChange={(event) => setBusiness(event.target.value)} placeholder="Ex.: clínica, loja ou restaurante" required /></label>
        <div className="brief-row">
          <label><span>Já possui um site?</span><select value={hasSite} onChange={(event) => setHasSite(event.target.value)}><option>Não</option><option>Sim</option><option>Está desatualizado</option></select></label>
          <label><span>Principal objetivo</span><select value={goal} onChange={(event) => setGoal(event.target.value)}><option>Conseguir mais clientes</option><option>Organizar atendimentos</option><option>Vender pela internet</option><option>Apresentar melhor o negócio</option><option>Criar um sistema interno</option></select></label>
        </div>
        <label><span>O que você imagina?</span><textarea value={details} onChange={(event) => setDetails(event.target.value)} placeholder="Conte brevemente sua ideia, necessidade ou dificuldade atual." rows={4} /></label>
        <div className="brief-contact-actions">
          <button type="submit">Copiar resumo do projeto →</button>
          <InstagramCta className="brief-instagram" />
        </div>
        <p className="contact-feedback" aria-live="polite">{feedback}</p>
      </form>
    </section>
  );
}

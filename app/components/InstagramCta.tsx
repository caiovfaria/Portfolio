"use client";

import { useId, useRef } from "react";
import { hasInstagramUrl, INSTAGRAM_URL } from "../contact";

type InstagramCtaProps = {
  className?: string;
  label?: string;
  pendingLabel?: string;
  tabIndex?: number;
};

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle className="instagram-icon-dot" cx="17.4" cy="6.7" r="1" />
    </svg>
  );
}

export default function InstagramCta({
  className = "",
  label = "Enviar mensagem",
  pendingLabel = "Instagram em breve",
  tabIndex,
}: InstagramCtaProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const classes = `instagram-cta ${className}`.trim();
  const content = <><InstagramIcon /><span>{hasInstagramUrl ? label : pendingLabel}</span></>;

  if (hasInstagramUrl) {
    return (
      <>
        <button className={classes} type="button" tabIndex={tabIndex} onClick={() => dialogRef.current?.showModal()}>
          {content}
        </button>
        <dialog
          ref={dialogRef}
          className="privacy-dialog"
          aria-labelledby={titleId}
          onClick={(event) => {
            if (event.target === event.currentTarget) event.currentTarget.close();
          }}
        >
          <div className="privacy-dialog-card">
            <button className="privacy-dialog-close" type="button" aria-label="Fechar aviso" onClick={() => dialogRef.current?.close()}>×</button>
            <p>ANTES DE CONTINUAR</p>
            <h2 id={titleId}>Sua privacidade importa.</h2>
            <span>
              Os dados preenchidos ficam no seu navegador e servem apenas para montar o resumo da conversa. Este site não envia nem salva essas informações em um banco de dados.
            </span>
            <span>
              Ao continuar, o Instagram será aberto em uma nova aba. A mensagem só será enviada quando você decidir enviá-la por lá, seguindo também as regras de privacidade da Meta.
            </span>
            <a className="privacy-dialog-policy" href="/privacidade">Ler a Política de Privacidade completa</a>
            <div className="privacy-dialog-actions">
              <button type="button" onClick={() => dialogRef.current?.close()}>Voltar</button>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" onClick={() => dialogRef.current?.close()}>Continuar para o Instagram</a>
            </div>
          </div>
        </dialog>
      </>
    );
  }

  return (
    <span
      className={`${classes} instagram-pending`}
      role="link"
      aria-disabled="true"
      tabIndex={tabIndex}
      title="O perfil profissional será conectado em breve"
    >
      {content}
    </span>
  );
}

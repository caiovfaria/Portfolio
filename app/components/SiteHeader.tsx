"use client";

import { useEffect, useRef, useState } from "react";
import BrandLogo from "./BrandLogo";

const links = [
  ["#projetos", "Projetos"],
  ["#solucoes", "Soluções"],
  ["#orcamento", "Orçamento"],
  ["#sobre", "Sobre"],
] as const;

export default function SiteHeader({ whatsapp }: { whatsapp: string }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;

    firstLinkRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const desktopQuery = window.matchMedia("(min-width: 821px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => event.matches && setOpen(false);

    document.addEventListener("keydown", closeOnEscape);
    desktopQuery.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      desktopQuery.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <BrandLogo href="#inicio" label="Ir para o início" />
      <nav className="desktop-nav" aria-label="Navegação principal">
        {links.map(([href, text]) => <a href={href} key={href}>{text}</a>)}
      </nav>
      <a className="button button-small" href={whatsapp} target="_blank" rel="noreferrer">Falar no WhatsApp</a>
      <button
        ref={toggleRef}
        className={`menu-toggle${open ? " is-open" : ""}`}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => setOpen((current) => !current)}
      >
        <span /><span /><span />
      </button>
      <button
        className={`menu-backdrop${open ? " is-open" : ""}`}
        type="button"
        aria-label="Fechar menu"
        aria-hidden={!open}
        tabIndex={open ? 0 : -1}
        onClick={closeMenu}
      />
      <nav
        className={`mobile-nav${open ? " is-open" : ""}`}
        id="mobile-navigation"
        aria-label="Navegação mobile"
        aria-hidden={!open}
      >
        <p><span>NAVEGAÇÃO</span><b>04 LINKS</b></p>
        {links.map(([href, text], index) => (
          <a
            ref={index === 0 ? firstLinkRef : undefined}
            href={href}
            key={href}
            onClick={closeMenu}
            tabIndex={open ? 0 : -1}
          >
            <small>0{index + 1}</small><span>{text}</span><b>↘</b>
          </a>
        ))}
      </nav>
    </header>
  );
}

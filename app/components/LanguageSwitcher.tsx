"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { translations } from "../translations";

type Locale = "pt" | "en";

const STORAGE_KEY = "cvf-language";
const translatedAttributes = ["placeholder", "title", "aria-label", "alt"] as const;
const reverseTranslations = new Map(Object.entries(translations).map(([portuguese, english]) => [english, portuguese]));
const originalText = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<Element, Map<string, string>>();

function translatedValue(value: string, locale: Locale) {
  const leading = value.match(/^\s*/)?.[0] ?? "";
  const trailing = value.match(/\s*$/)?.[0] ?? "";
  const core = value.trim();

  if (locale === "pt") {
    const direct = reverseTranslations.get(core);
    if (direct) return `${leading}${direct}${trailing}`;

    const decorated = core.match(/^(.*?)(\s*[→↗↑])$/);
    if (decorated) {
      const translated = reverseTranslations.get(decorated[1].trim());
      if (translated) return `${leading}${translated}${decorated[2]}${trailing}`;
    }

    return value;
  }

  const direct = translations[core];

  if (direct) return `${leading}${direct}${trailing}`;

  const decorated = core.match(/^(.*?)(\s*[→↗↑])$/);
  if (decorated) {
    const translated = translations[decorated[1].trim()];
    if (translated) return `${leading}${translated}${decorated[2]}${trailing}`;
  }

  return value;
}

function translateTextNode(node: Text, locale: Locale) {
  const current = node.nodeValue ?? "";
  let source = originalText.get(node);

  if (source === undefined) {
    source = current;
    originalText.set(node, source);
  } else if (current !== source && current !== translatedValue(source, "en")) {
    source = current;
    originalText.set(node, source);
  }

  const next = translatedValue(source, locale);
  if (next !== current) node.nodeValue = next;
}

function translateAttribute(element: Element, attribute: string, locale: Locale) {
  const current = element.getAttribute(attribute);
  if (current === null) return;

  let stored = originalAttributes.get(element);
  if (!stored) {
    stored = new Map();
    originalAttributes.set(element, stored);
  }

  let source = stored.get(attribute);
  if (source === undefined) {
    source = current;
    stored.set(attribute, source);
  } else if (current !== source && current !== translatedValue(source, "en")) {
    source = current;
    stored.set(attribute, source);
  }

  const next = translatedValue(source, locale);
  if (next !== current) element.setAttribute(attribute, next);
}

function translateTree(root: Node, locale: Locale) {
  if (root instanceof Element && root.closest("[data-no-translate], [hidden]")) return;

  if (root instanceof Text) {
    const parent = root.parentElement;
    if (!parent || parent.closest("[hidden]") || ["SCRIPT", "STYLE", "NOSCRIPT", "TITLE"].includes(parent.tagName)) return;
    translateTextNode(root, locale);
    return;
  }

  if (root instanceof Element) {
    translatedAttributes.forEach((attribute) => translateAttribute(root, attribute, locale));
  }

  root.childNodes.forEach((child) => translateTree(child, locale));
}

export default function LanguageSwitcher() {
  const [locale, setLocale] = useState<Locale>("pt");
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    setLocale(saved === "en" ? "en" : "pt");
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    document.documentElement.lang = locale === "en" ? "en" : "pt-BR";
    window.localStorage.setItem(STORAGE_KEY, locale);
    translateTree(document.body, locale);
    window.dispatchEvent(new CustomEvent("cvf-language-change", { detail: { locale } }));

    let translationFrame = 0;

    const observer = new MutationObserver((mutations) => {
      cancelAnimationFrame(translationFrame);
      translationFrame = requestAnimationFrame(() => {
        mutations.forEach((mutation) => {
          if (mutation.type === "childList") {
            mutation.addedNodes.forEach((node) => translateTree(node, locale));
          } else {
            translateTree(mutation.target, locale);
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: [...translatedAttributes],
    });

    return () => {
      cancelAnimationFrame(translationFrame);
      observer.disconnect();
    };
  }, [locale, ready]);

  return (
    <button
      type="button"
      className="language-switcher"
      data-no-translate
      disabled={!ready}
      onClick={() => setLocale((current) => current === "pt" ? "en" : "pt")}
      aria-label={locale === "pt" ? "Switch site to English" : "Mudar o site para português"}
      title={locale === "pt" ? "Switch to English" : "Mudar para português"}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" />
      </svg>
      <span>{locale === "pt" ? "EN" : "PT"}</span>
    </button>
  );
}

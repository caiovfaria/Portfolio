import type { Metadata } from "next";
import { headers } from "next/headers";

export type ProjectData = {
  slug: "barbearia" | "pizzaria";
  name: string;
  eyebrow: string;
  headline: string;
  description: string;
  image: string;
  imageAlt: string;
  liveUrl: string;
  challenge: string;
  solution: string;
  features: string[];
  technologies: string;
  timeline: string;
  audience: string;
  steps: Array<[string, string]>;
  nextSlug: "barbearia" | "pizzaria";
  nextName: string;
};

export const projects: Record<ProjectData["slug"], ProjectData> = {
  barbearia: {
    slug: "barbearia",
    name: "Barbearia Norte",
    eyebrow: "SITE INSTITUCIONAL + AGENDAMENTO",
    headline: "Uma experiência escura e elegante que transforma interesse em agendamento.",
    description: "Projeto demonstrativo criado para posicionar uma barbearia como marca premium e reduzir o caminho entre conhecer os serviços e reservar um horário.",
    image: "/projects/barbearia-menu.png",
    imageAlt: "Tela inicial em modo escuro do site Barbearia Norte",
    liveUrl: "https://caiovfaria.github.io/Landing-Page-Barbearia/",
    challenge: "Apresentar serviços, profissionais e produtos sem deixar a navegação pesada, além de tornar o agendamento simples no celular.",
    solution: "Uma página de alto impacto com identidade visual consistente, hierarquia clara e chamadas posicionadas para levar o visitante ao agendamento.",
    features: ["Serviços organizados", "Apresentação da equipe", "Catálogo comercial", "Agendamento rápido", "Layout responsivo", "Identidade visual premium"],
    technologies: "HTML · CSS · JavaScript",
    timeline: "7–10 dias",
    audience: "Barbearias, salões e profissionais de beleza",
    steps: [["01", "Descoberta e organização do conteúdo"], ["02", "Direção visual e experiência mobile"], ["03", "Desenvolvimento e integrações"], ["04", "Testes, ajustes e publicação"]],
    nextSlug: "pizzaria",
    nextName: "Pizzaria Fornalha",
  },
  pizzaria: {
    slug: "pizzaria",
    name: "Pizzaria Fornalha",
    eyebrow: "CARDÁPIO DIGITAL + SISTEMA DE PEDIDOS",
    headline: "Um cardápio completo que organiza escolhas e facilita cada pedido.",
    description: "Sistema demonstrativo criado para apresentar sabores, permitir personalizações e conduzir o cliente da descoberta até a revisão do pedido.",
    image: "/projects/pizzaria-menu.png",
    imageAlt: "Tela do menu principal da Pizzaria Fornalha",
    liveUrl: "https://caiovfaria.github.io/Pizzaria/",
    challenge: "Exibir diversas opções de pizzas doces e salgadas sem confundir o cliente, mantendo a montagem do pedido rápida e agradável.",
    solution: "Uma experiência dividida por categorias, com busca, favoritos, personalização e um resumo claro antes da finalização.",
    features: ["15 sabores cadastrados", "Categorias separadas", "Busca e favoritos", "Personalização do pedido", "Carrinho e resumo", "Experiência responsiva"],
    technologies: "React · TypeScript · Vite",
    timeline: "3–5 semanas",
    audience: "Pizzarias, restaurantes e negócios de delivery",
    steps: [["01", "Mapeamento do cardápio e do pedido"], ["02", "Arquitetura das telas e categorias"], ["03", "Desenvolvimento das funcionalidades"], ["04", "Testes do fluxo e publicação"]],
    nextSlug: "barbearia",
    nextName: "Barbearia Norte",
  },
};

export async function projectMetadata(project: ProjectData): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const base = new URL(`${protocol}://${host}`);
  const title = `${project.name} | Projeto C.Vian`;
  return {
    title,
    description: project.description,
    openGraph: { title, description: project.description, type: "website", images: [{ url: new URL(project.image, base).toString(), alt: project.imageAlt }] },
    twitter: { card: "summary_large_image", title, description: project.description, images: [new URL(project.image, base).toString()] },
  };
}

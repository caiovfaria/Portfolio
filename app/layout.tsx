import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist } from "next/font/google";
import ScrollReveal from "./components/ScrollReveal";
import "./globals.css";
import "./portfolio.css";
import "./refresh.css";
import "./experience.css";
import "./project-detail.css";
import "./responsive.css";
import "./motion.css";
import "./identity-nav.css";
import "./featured-projects.css";
import "./radius-system.css";
import "./contact-channel.css";
import "./privacy.css";
const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const base = new URL(`${protocol}://${host}`);
  const title = "CVF | Sites e sistemas para pequenos negócios";
  const description = "Desenvolvimento de sites rápidos, responsivos e pensados para gerar contatos para pequenos negócios.";
  return {
    metadataBase: base,
    title,
    description,
    icons: {
      icon: [
        { url: "/favicon-cvf-v2.svg", type: "image/svg+xml" },
        { url: "/favicon-cvf-v2-32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-cvf-v2-16.png", sizes: "16x16", type: "image/png" },
      ],
      shortcut: "/favicon-cvf-v2.ico",
      apple: "/apple-touch-icon-cvf.png?v=2",
    },
    openGraph: { title, description, type: "website", url: base, images: [{ url: new URL("/og.png", base).toString(), width: 1200, height: 630, alt: "Portfólio de desenvolvimento web" }] },
    twitter: { card: "summary_large_image", title, description, images: [new URL("/og.png", base).toString()] },
  };
}
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={geist.variable}>{children}<ScrollReveal /></body></html>;
}

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
const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const base = new URL(`${protocol}://${host}`);
  const title = "C.Vian | Sites e sistemas para pequenos negócios";
  const description = "Desenvolvimento de sites rápidos, responsivos e pensados para gerar contatos para pequenos negócios.";
  return {
    metadataBase: base,
    title,
    description,
    icons: {
      icon: [
        { url: "/favicon-cv.ico?v=3", sizes: "any" },
        { url: "/favicon-cv-32.png?v=3", sizes: "32x32", type: "image/png" },
        { url: "/favicon-cv-16.png?v=3", sizes: "16x16", type: "image/png" },
      ],
      shortcut: "/favicon-cv.ico?v=3",
      apple: "/apple-touch-icon-cv.png?v=3",
    },
    openGraph: { title, description, type: "website", url: base, images: [{ url: new URL("/og.png", base).toString(), width: 1200, height: 630, alt: "Portfólio de desenvolvimento web" }] },
    twitter: { card: "summary_large_image", title, description, images: [new URL("/og.png", base).toString()] },
  };
}
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={geist.variable}>{children}<ScrollReveal /></body></html>;
}

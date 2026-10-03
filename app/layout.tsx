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
import "./theme-indigo-plum.css";
const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const base = new URL(`${protocol}://${host}`);
  const title = "CVF | Soluções digitais para pequenos negócios";
  const description = "Soluções digitais claras, responsivas e pensadas para gerar contatos e organizar experiências para pequenos negócios.";
  return {
    metadataBase: base,
    title,
    description,
    icons: {
      icon: [
        { url: "/brand/favicon-cvf-navy-v2.png", sizes: "64x64", type: "image/png" },
      ],
      shortcut: "/brand/favicon-cvf-navy-v2.png",
      apple: "/brand/apple-touch-icon-cvf-monogram-v1.png",
    },
    openGraph: { title, description, type: "website", url: base, images: [{ url: new URL("/og.png", base).toString(), width: 1200, height: 630, alt: "Portfólio de desenvolvimento web" }] },
    twitter: { card: "summary_large_image", title, description, images: [new URL("/og.png", base).toString()] },
  };
}
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={geist.variable}>{children}<ScrollReveal /></body></html>;
}

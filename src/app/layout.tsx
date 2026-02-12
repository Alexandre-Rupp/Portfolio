import type { Metadata } from "next";
import { Barlow, Bebas_Neue } from "next/font/google";
import IntroGate from "@/components/intro-gate";
import PageAnimations from "@/components/page-animations";
import SidePixelBackground from "@/components/side-pixel-background";
import Script from "next/script";
import "./globals.css";

const heading = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading"
});

const body = Barlow({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Portfolio Alexandre Rupp",
  description: "Portfolio informatique en quatre pages : menu, développement, infrastructure et DevOps"
};

const themeInitScript = `
(() => {
  try {
    document.documentElement.dataset.introComplete = "0";
    const storedTheme = localStorage.getItem("portfolio-theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const theme = storedTheme === "dark" || storedTheme === "light" ? storedTheme : systemTheme;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {
    document.documentElement.dataset.introComplete = "0";
    document.documentElement.dataset.theme = "light";
    document.documentElement.style.colorScheme = "light";
  }
})();
`;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${heading.variable} ${body.variable}`}>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <SidePixelBackground />
        <IntroGate />
        <div className="app-shell">
          <PageAnimations />
          {children}
        </div>
      </body>
    </html>
  );
}

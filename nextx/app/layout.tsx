import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Catálogo de Perfumes | MCosmeticos",
  description: "Catálogo moderno de perfumes com Next.js, Tailwind e NextUI.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Catálogo de Perfumes | MCosmeticos",
    description: "Catálogo moderno de perfumes com Next.js, Tailwind e NextUI.",
    url: "https://seusite.com/",
    siteName: "MCosmeticos",
    images: [
      {
        url: "/fundo.jpg",
        width: 1200,
        height: 630,
        alt: "Banner MCosmeticos",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground min-h-screen`}>
        {children}
      </body>
    </html>
  );
}

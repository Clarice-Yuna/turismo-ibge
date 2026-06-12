import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hospedagem Dashboard - Pesquisa de Serviços de Hospedagem IBGE 2016",
  description: "Dashboard interativo com dados da Pesquisa de Serviços de Hospedagem do IBGE 2016. Gráficos, curiosidades, quiz e ranking.",
  keywords: ["IBGE", "hospedagem", "dashboard", "hotéis", "pousadas", "turismo", "Brasil"],
  authors: [{ name: "Hospedagem Dashboard" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

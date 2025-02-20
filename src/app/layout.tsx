"use client";

import { ReactNode } from "react";
import Head from "next/head";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/globals.css";
import "./styles/fonts.css";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-br">
      <Head>
        <title>Calculadora de Fator de Segurança</title>
        <meta name="description" content="Uma aplicação para calcular o fator de segurança de caixas." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body style={{ paddingTop: '30px' }}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

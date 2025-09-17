/**
 * Nome do arquivo: app/layout.js
 * Data de criação: 17/09/2025
 * Autor: João Pompeu
 * Matrícula: 01748208
 *
 * Descrição:
 * Layout raiz que juntará os principais componentes da aplicação (Header, {children}, Footer)
 *
 * Este script é parte o curso de ADS.
 */
import "./globals.css";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";

export const metadata = {
  title: "Desafio BackEnd Next.js",
  description:
    "Desafio de BackEnd passado pelo professor Chicho no terceiro semestre de ADS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

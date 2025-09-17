import "./globals.css";

export const metadata = {
  title: "Desafio BackEnd Next.js",
  description: "Desafio de BackEnd passado pelo professor Chicho no terceiro semestre de ADS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}

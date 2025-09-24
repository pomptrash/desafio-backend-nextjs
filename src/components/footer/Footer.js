/**
 * Nome do arquivo: Footer.js
 * Data de criação: 17/09/2025
 * Autor: João Pompeu
 * Matrícula: 01748208
 *
 * Descrição:
 * Componente Footer que será importado no app/layout.js e ficará visível em toda a aplicação
 * Contém informações sobre o projeto e links para os repositórios
 *
 * Este script é parte o curso de ADS.
 */
export function Footer() {
  return (
    <footer className="footer">
      <a className="footer-link link" href="https://github.com/pomptrash/desafio-backend-nextjs" target="_blank">
        Meu repositório
      </a>
      <a className="footer-link link" href="https://github.com/FranciscoWallison/desafio-back-end" target="_blank">
        Repositório do desafio
      </a>
    </footer>
  );
}

/**
 * Nome do arquivo: app/page.js
 * Data de criação: 17/09/2025
 * Autor: João Pompeu
 * Matrícula: 01748208
 *
 * Descrição:
 * Rota inicial /
 * contém uma <section> que apresentará a descrição do projeto.
 *
 * Este script é parte o curso de ADS.
 */
export default function Home() {
  return (
    <section className="home-section">
      <p className="text-2xl font-bold">
        Desafio FullStack proposto pelo professor Chico do  3º semestre de Análise e Desenvolvimento de Sistemas, UniNassau.
      </p>
      <p className="text-xl font-medium">
        O objetivo é construir uma API RESTful e uma interface visual que
        permitam as operações completas de CRUD (criar, ler, atualizar e
        deletar) utlizando o FrameWork NEXT.js.
      </p>
    </section>
  );
}

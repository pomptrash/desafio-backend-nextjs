/**
 * Nome do arquivo: Header.js
 * Data de criação: 17/09/2025
 * Autor: João Pompeu
 * Matrícula: 01748208
 *
 * Descrição:
 * Componente Header que será importado no app/layout.js e ficará visível em toda a aplicação
 * Conta com, além do título, a <navbar> que será responsável pela navegação entre as rotas
 *
 * Este script é parte o curso de ADS.
 */
import Link from "next/link";

export function Header() {
  return (
    <header className="header">
      <h1 className="title">Desafio Backend Next.js</h1>
      <navbar className="navbar">
        <ul className="navbar-ul">
          <li className="navbar-li">
            <Link href={"/"}>Página Inicial</Link>
          </li>
          <li className="navbar-li">
            <Link href={"/clients"}>Clientes</Link>
          </li>
        </ul>
      </navbar>
    </header>
  );
}

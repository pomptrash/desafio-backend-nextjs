/**
 * Nome do arquivo: clients/page.js
 * Data de criação: 17/09/2025
 * Autor: João Pompeu
 * Matrícula: 01748208
 *
 * Descrição:
 * Rota /clients
 * Será responsável por renderizar a tabela HTML com os clientes cadastrados
 *
 * Este script é parte o curso de ADS.
 */
import { Client } from "./_components/Client";
import { getClients } from "../../../services/clientServices";
import Link from "next/link";
export default async function Clients() {
  const clients = await getClients();

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Nome</td>
            <td>Endereço</td>
            <td>Telefone</td>
            <td>Email</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <Client key={client.email} clientData={client} index={index} />
          ))}
        </tbody>
      </table>
      <button>
        <Link href={"/clients/new-client"}>Cadastrar novo cliente</Link>
      </button>
    </div>
  );
}

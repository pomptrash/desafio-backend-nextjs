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
      <div className="table-wrapper">
        <table className="border-2 border-collapse mb-7">
          <thead>
            <tr className="table-tr font-extrabold">
              <td className="table-td">ID</td>
              <td className="table-td">Nome</td>
              <td className="table-td">Telefone</td>
              <td className="table-td">Email</td>
              <td className="table-td">Endereço</td>
              <td className="table-td">Actions</td>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <Client key={client.email} clientData={client} index={index} />
            ))}
          </tbody>
        </table>
      </div>
      <button className="btn">
        <Link href={"/clients/new-client"}>Cadastrar cliente</Link>
      </button>
    </div>
  );
}

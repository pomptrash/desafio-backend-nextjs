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
export default function Clients() {
  // array para testes
  const clients = [
    {
      id: "1",
      name: "joao",
      address: "rua 10",
      phone: "85940028922",
      email: "joao@email.com",
    },
    {
      id: "2",
      name: "maria",
      address: "rua 5",
      phone: "85940028922",
      email: "maria@email.com",
    },
  ];
  return (
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
        {clients.map((client) => (
          <Client key={client.email} clientData={client} />
        ))}
      </tbody>
    </table>
  );
}

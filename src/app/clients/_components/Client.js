/**
 * Nome do arquivo: Client.js
 * Data de criação: 17/09/2025
 * Autor: João Pompeu
 * Matrícula: 01748208
 *
 * Descrição:
 * Componente 'Client' que será responsável por renderizar uma table row (<tr>) da tabela HTML.
 * O componente recebe como props um objeto com as informações do cliente
 * Cada instância do componente mostrará um cliente cadastrado
 *
 * Este script é parte o curso de ADS.
 */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UpdateClient } from "./UpdateClient";
import { deleteClient } from "../../../../services/clientServices";
import Link from "next/link";

export function Client({ clientData, index }) {
  // ao clicar em atualizar, o state update recebe 'true' e o componente 'UpdateClient' é renderizado
  const [update, setUpdate] = useState(false); // state para capturar clique no botão de atualizar

  // router para atualizar a página após a exclusão
  const router = useRouter();
  const { id, name, address, phone, email } = clientData ?? {};

  // função para tratar o método delete
  async function handleDelete() {
    // confirmação para deletar
    const confirmed = window.confirm(`Tem certeza que deseja deletar ${name}`);

    // se confirmado
    if (confirmed) {
      try {
        // faz a requisição de DELETE na api
        await deleteClient(id);
        // se tudo ok, atualiza a página para mostrar a listagem de clientes atualizada
        router.refresh();
        alert("Cliente deletado com sucesso.");
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    }
  }
  return (
    <tr>
      {/* index somente para visualização */}
      <td>{index + 1}</td>

      {/* caso update seja true, ou seja, ação de atualizar foi chamada */}
      {update ? (
        <UpdateClient
          update={update}
          setUpdate={setUpdate}
          clientData={clientData}
        />
      ) : (
        <>
          {/* caso update seja false, ou seja, ação de atualizar não foi chamada */}
          <td>{name}</td>
          <td>{address}</td>
          <td>{phone}</td>
          <td>{email}</td>
          <td>
            {/* ao clicar, o state update recebe true */}
            <button onClick={() => setUpdate(!update)}>Atualizar</button>
            <button onClick={() => handleDelete()}>Deletar</button>
            <Link href={`/clients/${id}`}>
              <button>Ordens de serviço</button>
            </Link>
          </td>
        </>
      )}
    </tr>
  );
}

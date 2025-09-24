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

// ícones
import { Pencil, Trash } from 'lucide-react';

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
    <tr className="table-tr font-semibold uppercase">
      {/* index somente para visualização */}
      <td className="table-td">{index + 1}</td>

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
          <td className="table-td">{name}</td>
          <td className="table-td">{phone}</td>
          <td className="table-td">{email}</td>
          <td className="table-td">{address}</td>
          <td className="actions">
            {/* ao clicar, o state update recebe true */}
            <button className="btn" onClick={() => setUpdate(!update)}><Pencil className="font-bold"/></button>
            <button className="btn" onClick={() => handleDelete()}><Trash className="font-bold"/></button>
            <Link href={`/clients/${id}`}>
              <button className="border-l-2 pl-1 py-3 border-primary hover:scale-110">Ordens de serviço</button>
            </Link>
          </td>
        </>
      )}
    </tr>
  );
}

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
import { UpdateClient } from "./UpdateClient";
export function Client({ clientData }) {
  const [update, setUpdate] = useState(false); // state para capturar clique no botão de atualizar
  // ao clicar em atualizar, o state update recebe 'true' e o componente 'UpdateClient' é renderizado

  const { id, name, address, phone, email } = clientData ?? {};

  return (
    <tr>
      {/* id imutável */}
      <td>{id}</td> 

      {/* caso update seja true, ou seja, ação de atualizar foi chamada */}
      {update && <UpdateClient update={update} setUpdate={setUpdate} clientData={clientData} />}
      {/* caso update seja false, ou seja, ação de atualizar não foi chamada */}
      {!update && (
        <>
          <td>{name}</td>
          <td>{address}</td>
          <td>{phone}</td>
          <td>{email}</td>
          <td>
            {/* ao clicar, o state update recebe true */}
            <button onClick={() => setUpdate(!update)}>Atualizar</button>
            <button>Deletar</button>
          </td>
        </>
      )}
    </tr>
  );
}

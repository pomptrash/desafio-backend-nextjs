/**
 * Nome do arquivo: UpdateClient.js
 * Data de criação: 17/09/2025
 * Autor: João Pompeu
 * Matrícula: 01748208
 *
 * Descrição:
 * Componente criado para facilitar a atualização dos dados do cliente
 * Ao clicar em atualizar, renderiza inputs
 * o defaultValue de cada input recebe o valor anterior dos respectivos campos
 *
 *
 * Este script é parte o curso de ADS.
 */
"use client";
import { updateClientAPI } from "../../../../services/clientServices";
import { useState } from "react";
import { useRouter } from "next/navigation";
export function UpdateClient({ update, setUpdate, clientData }) {
  const router = useRouter();
  const { id, name, address, phone, email } = clientData ?? {}; // dados atuais do cliente
  const [newName, setNewName] = useState(name);
  const [newAddress, setNewAddress] = useState(address);
  const [newPhone, setNewPhone] = useState(phone);
  const [newEmail, setNewEmail] = useState(email);

  const newClientData = {
    name: newName,
    address: newAddress,
    phone: newPhone,
    email: newEmail,
  };

  // função para tratar o método update
  async function handleClick() {
    //  pequena validação
    if (!name || !address || !phone || !email) {
      alert("Preencha todos os campos.");
      return;
    } else {
      try {
        const updatedClient = await updateClientAPI(id, newClientData);
        if (updatedClient) {
          alert("Atualizado com sucesso");
          setUpdate(!update);
          router.refresh();
        } else {
          throw new Error("Erro");
        }
      } catch (err) {
        console.log(err);
        alert(`Erro ao atualizar dados: ${err}`);
      }
    }
  }
  return (
    <>
      <td>
        <input
          placeholder="Nome"
          defaultValue={name}
          onChange={(e) => setNewName(e.target.value)}
        ></input>
      </td>
      <td>
        <input
          placeholder="Endereço"
          defaultValue={address}
          onChange={(e) => setNewAddress(e.target.value)}
        ></input>
      </td>
      <td>
        <input
          placeholder="Telefone"
          defaultValue={phone}
          type="number"
          onChange={(e) => setNewPhone(e.target.value)}
        ></input>
      </td>
      <td>
        <input
          placeholder="Email"
          defaultValue={email}
          type="email"
          onChange={(e) => setNewEmail(e.target.value)}
        ></input>
      </td>
      <td>
        <button onClick={() => handleClick()}>Confirmar</button>
      </td>
    </>
  );
}

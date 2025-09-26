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
import { updateClientAPI } from "../../../services/clientServices";
import { useState } from "react";
import { useRouter } from "next/navigation";
export function UpdateClient({ update, setUpdate, clientData }) {
  // router para atualizar a página após a atualização
  const router = useRouter();

  const { id, name, address, phone, email } = clientData ?? {}; // desestruturação dos dados atuais do cliente

  // states para os dados atualizados
  const [newName, setNewName] = useState(name);
  const [newAddress, setNewAddress] = useState(address);
  const [newPhone, setNewPhone] = useState(phone);
  const [newEmail, setNewEmail] = useState(email);

  // função para tratar o método update
  async function handleClick() {
    //  pequena validação
    if (!newName || !newAddress || !newPhone || !newEmail) {
      alert("Preencha todos os campos.");
      return;
    } else {
      // criação do objeto com os novos dados
      const newClientData = {
        name: newName.charAt(0).toUpperCase() + newName?.slice(1),
        address: newAddress,
        phone: newPhone,
        email: newEmail,
      };
      try {
        // faz a requisição de atualização na API
        await updateClientAPI(id, newClientData);
        alert("Atualizado com sucesso");
        setUpdate(!update);
        // se tudo ok, atualiza a página para mostrar os dados atualizados.
        router.refresh();
      } catch (err) {
        console.log(err);
        alert(err.message);
      }
    }
  }
  return (
    <>
      <td className="table-td">
        <input
          className="input max-w-fit"
          required
          placeholder="Nome (Obrigatório)"
          defaultValue={name}
          onChange={(e) => setNewName(e.target.value)}
        ></input>
      </td>
      <td className="table-td">
        <input
          className="input"
          required
          placeholder="Telefone (Obrigatório)"
          defaultValue={phone}
          type="tel"
          onChange={(e) => setNewPhone(e.target.value)}
        ></input>
      </td>
      <td className="table-td">
        <input
          className="input"
          required
          placeholder="Email (Obrigatório)"
          defaultValue={email}
          type="email"
          onChange={(e) => setNewEmail(e.target.value)}
        ></input>
      </td>
      <td className="table-td">
        <input
          className="input"
          required
          placeholder="Endereço (Obrigatório)"
          defaultValue={address}
          onChange={(e) => setNewAddress(e.target.value)}
        ></input>
      </td>
      <td className="actions">
        <button className="btn" onClick={() => handleClick()}>
          Confirmar
        </button>
        <button className="btn" onClick={() => setUpdate(!update)}>
          Cancelar
        </button>
      </td>
    </>
  );
}

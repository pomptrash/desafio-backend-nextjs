/**
 * Nome do arquivo: new-client/page.js
 * Data de criação: 18/09/2025
 * Autor: João Pompeu
 * Matrícula: 01748208
 *
 * Descrição:
 * Rota para cadastro de novo cliente
 * Contém form HTML para captura de dados
 * Guarda os valores em States
 * Valida dados e requisita o método POST
 *
 * Este script é parte o curso de ADS.
 */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchCEP } from "../../../../services/viaCepApi";
import { createNewClient } from "../../../../services/clientServices";
export default function NewClient() {
  const [newClientName, setNewClientName] = useState();
  const [newClientPhone, setNewClientPhone] = useState();
  const [newClientEmail, setNewClientEmail] = useState();

  const [clientCEP, setClientCEP] = useState();
  const [clientLogradouro, setClientLogradouro] = useState("");
  const [clientNumero, setClientNumero] = useState();
  const [clientBairro, setClientBairro] = useState("");
  const [clientCidade, setClientCidade] = useState("");
  const [clientUF, setClientUF] = useState("");

  const router = useRouter();

  async function handleCEP(cep) {
    try {
      const data = await fetchCEP(cep);
      if (data) {
        setClientLogradouro(data.logradouro);
        setClientBairro(data.bairro);
        setClientCidade(data.localidade);
        setClientUF(data.uf);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handlePost() {
    const fullAdress = `${clientLogradouro}, ${clientNumero}, ${clientBairro}, ${clientCidade} - ${clientUF}`;
    const newClientData = {
      name: newClientName,
      address: fullAdress,
      phone: newClientPhone,
      email: newClientEmail,
    };
    if (
      !newClientData.name ||
      !newClientData.address ||
      !newClientData.phone ||
      !newClientData.email
    ) {
      alert("Preencha todos os campos.");
      return;
    }
    try {
      const created = await createNewClient(newClientData);
      if (created) {
        alert("Cliente criado com sucesso.");
        router.replace("/clients");
      } else {
        throw new Error("Erro");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar cliente.");
    }
  }
  return (
    <section>
      <h2>Novo Cliente</h2>
      <form>
        <input
          placeholder="Nome"
          onChange={(e) => setNewClientName(e.target.value)}
        ></input>
        <input
          placeholder="CEP"
          onChange={(e) => setClientCEP(e.target.value)}
          onBlur={(e) => handleCEP(clientCEP)}
        ></input>
        <input
          placeholder="Logradouro"
          disabled={true}
          value={clientLogradouro}
        ></input>
        <input
          placeholder="Bairro"
          disabled={true}
          value={clientBairro}
        ></input>
        <input
          placeholder="Cidade"
          disabled={true}
          value={clientCidade}
        ></input>
        <input placeholder="UF" disabled={true} value={clientUF}></input>
        <input
          placeholder="Número"
          type="number"
          onChange={(e) => setClientNumero(e.target.value)}
        ></input>

        <input
          placeholder="Telefone"
          type="tel"
          onChange={(e) => setNewClientPhone(e.target.value)}
        ></input>
        <input
          placeholder="E-mail"
          type="email"
          onChange={(e) => setNewClientEmail(e.target.value)}
        ></input>
        <button
          onClick={(e) => {
            e.preventDefault();
            handlePost();
          }}
        >
          Cadastrar
        </button>
      </form>
    </section>
  );
}

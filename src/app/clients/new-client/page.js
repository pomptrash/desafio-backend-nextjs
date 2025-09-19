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
import { fetchCEP } from "../../../../services/viaCepApi";
export default function NewClient() {
  const [newClientName, setNewClientName] = useState();
  const [newClientAddress, setNewClientAddress] = useState();
  const [newClientPhone, setNewClientPhone] = useState();
  const [newClientEmail, setNewClientEmail] = useState();

  const [newClientCEP, setNewClientCEP] = useState();
  const [newClientLogradouro, setNewClientLogradouro] = useState("");
  const [newClientNumero, setNewClientNumero] = useState();
  const [newClientBairro, setNewClientBairro] = useState("");
  const [newClientCidade, setNewClientCidade] = useState("");
  const [newClientUF, setNewClientUF] = useState("");

  const newClient = {
    name: newClientName,
    address: newClientAddress,
    phone: newClientPhone,
    email: newClientEmail,
  };

  async function handleCEP(cep) {
    try {
      const data = await fetchCEP(cep);
      if (data) {
        setNewClientLogradouro(data.logradouro);
        setNewClientBairro(data.bairro);
        setNewClientCidade(data.localidade);
        setNewClientUF(data.uf);
      }
    } catch (err) {
      console.log(err);
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
          onChange={(e) => setNewClientCEP(e.target.value)}
          onBlur={(e) => handleCEP(newClientCEP)}
        ></input>
        <input
          placeholder="Logradouro"
          disabled={true}
          value={newClientLogradouro}
        ></input>
        <input
          placeholder="Bairro"
          disabled={true}
          value={newClientBairro}
        ></input>
        <input
          placeholder="Cidade"
          disabled={true}
          value={newClientCidade}
        ></input>
        <input placeholder="UF" disabled={true} value={newClientUF}></input>
        <input
          placeholder="Número"
          type="number"
          onChange={(e) => setNewClientNumero(e.target.value)}
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
            setNewClientAddress(
              `${newClientLogradouro}, ${newClientNumero}, ${newClientBairro}, ${newClientCidade} - ${newClientUF}`
            );
          }}
        >
          Cadastrar
        </button>
      </form>
    </section>
  );
}

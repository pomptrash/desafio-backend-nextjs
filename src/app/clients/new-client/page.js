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
  // states para dados do novo cliente
  const [newClientName, setNewClientName] = useState();
  const [newClientPhone, setNewClientPhone] = useState();
  const [newClientEmail, setNewClientEmail] = useState();

  // states para compor o endereço do novo cliente
  const [clientCEP, setClientCEP] = useState("");
  const [clientLogradouro, setClientLogradouro] = useState("");
  const [clientNumero, setClientNumero] = useState("");
  const [clientBairro, setClientBairro] = useState("");
  const [clientCidade, setClientCidade] = useState("");
  const [clientUF, setClientUF] = useState("");

  // router para navegar até /clients após a finalização do cadastro
  const router = useRouter();

  // validação do cep e requisição na API via cep
  async function handleCEP(cep) {
    try {
      const data = await fetchCEP(cep);
      console.log(data);
      if (data) {
        setClientLogradouro(data?.logradouro);
        setClientBairro(data?.bairro);
        setClientCidade(data?.localidade);
        setClientUF(data?.uf);
      }
    } catch (err) {
      if (err.status === 404) {
        alert("CEP não encontrado");
      }
      console.log(err.message);
    }
  }

  // validação do endereço
  function addressValidation() {
    if (!clientLogradouro || !clientBairro || !clientCidade || !clientUF) {
      alert("Preencha o endereço corretamente");
      return false;
    }
    if (!clientNumero) {
      const fullAdress = `${clientLogradouro}, ${clientBairro}, ${clientCidade} - ${clientUF}`;
      return fullAdress;
    } else {
      const fullAdress = `${clientLogradouro}, ${clientNumero}, ${clientBairro}, ${clientCidade} - ${clientUF}`;
      return fullAdress;
    }
  }

  // criação do novo cliente
  async function handlePost() {
    // valida se o endereço está ok
    const fullAdress = addressValidation();
    if (!fullAdress) return;

    // cria o objeto com os dados validados
    const newClientData = {
      name: newClientName?.charAt(0).toUpperCase() + newClientName?.slice(1),
      address: fullAdress,
      phone: newClientPhone,
      email: newClientEmail,
    };

    // valida os dados no geral
    if (
      !newClientData.name ||
      !newClientData.address ||
      !newClientData.phone ||
      !newClientData.email
    ) {
      alert("Preencha todos os campos.");
      return;
    }

    // faz a requisição de criação do novo cliente
    try {
      await createNewClient(newClientData);
      alert("Cliente criado com sucesso.");
      // se tudo ok, volta para a listagem de clientes
      router.replace("/clients");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <section>
      <h2>Novo Cliente</h2>
      <form>
        <input
          required
          placeholder="Nome (Obrigatório)"
          onChange={(e) => setNewClientName(e.target.value)}
        ></input>
        <input
          required
          placeholder="E-mail (Obrigatório)"
          type="email"
          onChange={(e) => setNewClientEmail(e.target.value)}
        ></input>
        <input
          required
          placeholder="Telefone (Obrigatório)"
          type="tel"
          onChange={(e) => setNewClientPhone(e.target.value)}
        ></input>
        <input
          placeholder="CEP"
          type="number"
          onChange={(e) => setClientCEP(e.target.value)}
          onBlur={(e) => handleCEP(clientCEP)}
        ></input>
        <input
          required
          placeholder="Rua (Obrigatório)"
          value={clientLogradouro}
          onChange={(e) => setClientLogradouro(e.target.value)}
        ></input>
        <input
          placeholder="Número"
          onChange={(e) => setClientNumero(e.target.value)}
        ></input>
        <input
          required
          placeholder="Bairro (Obrigatório)"
          value={clientBairro}
          onChange={(e) => setClientBairro(e.target.value)}
        ></input>
        <input
          required
          placeholder="Cidade (Obrigatório)"
          value={clientCidade}
          onChange={(e) => setClientCidade(e.target.value)}
        ></input>
        *
        <select
          required
          placeholder="UF"
          value={clientUF}
          onChange={(e) => setClientUF(e.target.value)}
          maxLength={2}
        >
          <option value="AC">AC</option>
          <option value="AL">AL</option>
          <option value="AP">AP</option>
          <option value="AM">AM</option>
          <option value="BA">BA</option>
          <option value="CE">CE</option>
          <option value="DF">DF</option>
          <option value="ES">ES</option>
          <option value="GO">GO</option>
          <option value="MA">MA</option>
          <option value="MT">MT</option>
          <option value="MS">MS</option>
          <option value="MG">MG</option>
          <option value="PA">PA</option>
          <option value="PB">PB</option>
          <option value="PR">PR</option>
          <option value="PE">PE</option>
          <option value="PI">PI</option>
          <option value="RJ">RJ</option>
          <option value="RN">RN</option>
          <option value="RS">RS</option>
          <option value="RO">RO</option>
          <option value="RR">RR</option>
          <option value="SC">SC</option>
          <option value="SP">SP</option>
          <option value="SE">SE</option>
          <option value="TO">TO</option>
        </select>
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

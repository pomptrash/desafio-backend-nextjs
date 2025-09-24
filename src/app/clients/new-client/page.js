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
      <h2 className="form-title">Novo Cliente</h2>
      <form className="form">
        <input
          className="input form-input"
          required
          placeholder="Nome (Obrigatório)"
          onChange={(e) => setNewClientName(e.target.value)}
        ></input>
        <input
          className="input form-input"
          required
          placeholder="E-mail (Obrigatório)"
          type="email"
          onChange={(e) => setNewClientEmail(e.target.value)}
        ></input>
        <input
          className="input form-input"
          required
          placeholder="Telefone (Obrigatório)"
          type="tel"
          onChange={(e) => setNewClientPhone(e.target.value)}
        ></input>
        <input
          className="input form-input"
          placeholder="CEP"
          type="number"
          onChange={(e) => setClientCEP(e.target.value)}
          onBlur={(e) => handleCEP(clientCEP)}
        ></input>
        <input
          className="input form-input"
          required
          placeholder="Rua (Obrigatório)"
          value={clientLogradouro}
          onChange={(e) => setClientLogradouro(e.target.value)}
        ></input>
        <input
          className="input form-input"
          placeholder="Número"
          onChange={(e) => setClientNumero(e.target.value)}
        ></input>
        <input
          className="input form-input"
          required
          placeholder="Bairro (Obrigatório)"
          value={clientBairro}
          onChange={(e) => setClientBairro(e.target.value)}
        ></input>
        <input
          className="input form-input"
          required
          placeholder="Cidade (Obrigatório)"
          value={clientCidade}
          onChange={(e) => setClientCidade(e.target.value)}
        ></input>
        <select
          className="select"
          required
          placeholder="UF"
          value={clientUF}
          onChange={(e) => setClientUF(e.target.value)}
          maxLength={2}
        >
          <option className="select-option" value="AC">
            AC
          </option>
          <option className="select-option" value="AL">
            AL
          </option>
          <option className="select-option" value="AP">
            AP
          </option>
          <option className="select-option" value="AM">
            AM
          </option>
          <option className="select-option" value="BA">
            BA
          </option>
          <option className="select-option" value="CE">
            CE
          </option>
          <option className="select-option" value="DF">
            DF
          </option>
          <option className="select-option" value="ES">
            ES
          </option>
          <option className="select-option" value="GO">
            GO
          </option>
          <option className="select-option" value="MA">
            MA
          </option>
          <option className="select-option" value="MT">
            MT
          </option>
          <option className="select-option" value="MS">
            MS
          </option>
          <option className="select-option" value="MG">
            MG
          </option>
          <option className="select-option" value="PA">
            PA
          </option>
          <option className="select-option" value="PB">
            PB
          </option>
          <option className="select-option" value="PR">
            PR
          </option>
          <option className="select-option" value="PE">
            PE
          </option>
          <option className="select-option" value="PI">
            PI
          </option>
          <option className="select-option" value="RJ">
            RJ
          </option>
          <option className="select-option" value="RN">
            RN
          </option>
          <option className="select-option" value="RS">
            RS
          </option>
          <option className="select-option" value="RO">
            RO
          </option>
          <option className="select-option" value="RR">
            RR
          </option>
          <option className="select-option" value="SC">
            SC
          </option>
          <option className="select-option" value="SP">
            SP
          </option>
          <option className="select-option" value="SE">
            SE
          </option>
          <option className="select-option" value="TO">
            TO
          </option>
        </select>
        <button
          className="btn"
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

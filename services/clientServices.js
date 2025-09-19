/**
 * Nome do arquivo: clientServices.js
 * Data de criação: 18/09/2025
 * Autor: João Pompeu
 * Matrícula: 01748208
 *
 * Descrição:
 * Arquivo responsável por agrupar funções que irão fazer requisições na API
 *
 * Este script é parte o curso de ADS.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL;

import { prisma } from "../lib/prisma";

// pega os dados inicias diretamente do banco de dados com o prisma, função consumida pelo server component 'clients/page.js'
export async function getClients() {
  try {
    const clients = await prisma.client.findMany();
    return clients;
  } catch (err) {
    console.log(err);
    throw new Error("Falha ao requisitar clientes");
  }
}

// método post para criação de novo cliente
export async function createNewClient(newClientData) {
  try {
    const response = await fetch(`${API_URL}/api/clients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newClientData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (err) {
    console.error(err);
    throw new Error("Erro ao criar novo cliente");
  }
}

// atualiza os dados do cliente, função consumida no client component /clients/_components/UpdateClient.js
export async function updateClientAPI(clientID, newClientData) {
  try {
    const response = await fetch(`${API_URL}/api/clients/${clientID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newClientData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Erro ${response.status}: ${response.statusText}. Detalhes: ${errorText}`
      );
    }

    return await response.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// deleta um cliente, função consumida pelo client component 'clients/_components/Client.js'
export async function deleteClient(clientID) {
  try {
    const response = await fetch(`${API_URL}/api/clients/${clientID}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}: ${response.statusText}`);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

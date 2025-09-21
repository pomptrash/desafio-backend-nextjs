/**
 * Nome do arquivo: orderServices.js
 * Data de criação: 20/09/2025
 * Autor: João Pompeu
 * Matrícula: 01748208
 *
 * Descrição:
 * Arquivo responsável por agrupar funções que irão fazer requisições na API
 * Requisições das ordens de serviço
 *
 * Este script é parte o curso de ADS.
 */

// const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

import { prisma } from "../lib/prisma";

// pega os dados iniciais diretamente do banco de dados com o prisma
// evita 'loopback': servidor requisitando ele mesmo através da api
export async function getOrders() {
  try {
    const orders = await prisma.service_order.findMany({
      include: { client: true },
    });
    return orders;
  } catch (err) {
    console.log(err);
    throw new Error("Falha ao requisitar as ordens de serviços.");
  }
}

// função para consumir a API e criar nova ordem de serviço com o método POST
export async function createNewServiceOrder(newServiceOrderData) {
  try {
    const response = await fetch(`${API_URL}/api/services-orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newServiceOrderData),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar nova ordem de serviço");
    }

    return await response.json();
  } catch (err) {
    console.log(err);
    throw new Error("Erro ao criar nova ordem de serviço");
  }
}

// função para atualizar ordem de serviço, método PUT
export async function updateServiceOrder(orderID, newData) {
  try {
    const response = await fetch(`${API_URL}/api/services-orders/${orderID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
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

// função para deletar ordem de serviço
export async function deleteServiceOrder(orderID) {
  try {
    const response = await fetch(`${API_URL}/api/services-orders/${orderID}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}: ${response.statusText}`);
    }
  } catch (err) {
    throw err;
  }
}

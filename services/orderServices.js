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

import { prisma } from "../lib/prisma";

// pega os dados iniciais diretamente do banco de dados com o prisma
// evita 'loopback': servidor requisitando ele mesmo através da api
export async function getOrders(){
    try {
        const orders = prisma.service_order.findMany()
        return orders
    } catch (err) {
        console.log(err)
        throw new Error("Falha ao requisitar as ordens de serviços.")
    }
}
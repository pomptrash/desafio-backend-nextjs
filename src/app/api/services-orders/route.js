/**
 * Nome do arquivo: services-orders/route.js
 * Data de criação: 20/09/2025
 * Autor: João Pompeu
 * Matrícula: 01748208
 *
 * Descrição:
 *
 * Criação do endpoint '/services-orders' com suas rotas:
 * GET /services-orders: busca e retorna todos as ordens de serviços criadas
 * POST /services-orders: cria uma nova ordem de serviço
 *
 * Este script é parte o curso de ADS.
 */

import { prisma } from "@/lib/prisma";
import { getOrders } from "../../../services/orderServices";
import { NextResponse } from "next/server";

import { CORS_HEADERS, handleOptions } from "@/lib/cors-handler";
export { handleOptions as OPTIONS };

// método GET para buscar todas as ordens de serviços
export async function GET() {
  try {
    const orders = await getOrders();
    return NextResponse.json(orders, { status: 200, headers: CORS_HEADERS });
  } catch (err) {
    return NextResponse.json(
      { err: "Erro ao requisitar as ordens de serviço" },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

// método POST para criação de uma nova ordem de serviço
export async function POST(request) {
  try {
    const body = await request.json();

    const { client_id, deadline_date, order_description, estimated_cost } =
      body;

    // validando os campos obrigatórios
    if (!client_id || !order_description || order_description.trim() === "") {
      return NextResponse.json(
        { error: "Preencha todos os campos obrigatórios" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // após a validação, cria a nova ordem de serviço no banco de dados
    const newServiceOrder = await prisma.service_order.create({
      data: {
        client_id,
        deadline_date: body.deadline_date ? new Date(body.deadline_date) : null,
        order_description,
        estimated_cost:
          body.estimated_cost !== null ? parseFloat(body.estimated_cost) : null,
      },
    });

    return NextResponse.json(newServiceOrder, {
      status: 201,
      headers: CORS_HEADERS,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Erro ao criar nova ordem de serviço." },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

/**
 * Nome do arquivo: [id]/route.js
 * Data de criação: 20/09/2025
 * Autor: João Pompeu
 * Matrícula: 01748208
 *
 * Descrição:
 *
 * Criação do endpoint dinâmico '/services-orders/[id]' com suas rotas:
 * GET /services-orders/[id]: busca e retorna uma ordem de serivço
 * PUT /services-orders/[id]: atualiza uma ordem de serviço
 * DELETE /services-orders/[id]: deleta uma ordem de serviço
 *
 * Este script é parte o curso de ADS.
 */

import { prisma } from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

// método GET para requisitar uma ordem correspondente ao ID passado
export async function GET(request, { params }) {
  const { id: orderID } = await params;

  try {
    const order = await prisma.service_order.findUnique({
      where: {
        id: orderID,
      },
    });

    if (!order)
      return NextResponse.json(
        { error: "Ordem não encontrada" },
        { status: 404 }
      );

    return NextResponse.json(order, { status: 200 });
  } catch (err) {
    console.log(err);
    // prisma code para dado não localizado
    if (err.code === "P2025")
      return NextResponse.json(
        { error: "Ordem de serviço não localizada" },
        { status: 404 }
      );
    return NextResponse.json(
      { error: "Erro ao requisitar ordem" },
      { status: 500 }
    );
  }
}

// método PUT para atualizar os dados de uma ordem correspondente ao ID passado
export async function PUT(request, { params }) {
  try {
    const body = await request.json();

    // valores permitidos para o status da ordem de serviço
    const enumStatus = ["FINALIZADO", "PENDENTE", "CANCELADO"];

    // desestruturação de 'params' e do body da request
    const { id: orderID } = await params;
    const {
      deadline_date,
      order_description,
      estimated_cost,
      final_cost,
      order_status,
    } = body;

    // validando o valor passado para o status da ordem de serviço
    if (order_status && !enumStatus.includes(order_status))
      return NextResponse(
        { error: "Valor de status inválido" },
        { status: 400 }
      );

    // validando a nova descrição passada para a ordem de serviço
    if (!order_description || order_description.trim() === "" || !order_status)
      return NextResponse.json(
        { error: "Preencha os campos obrigatórios" },
        { status: 400 }
      );

    if (order_status === "FINALIZADO" && !final_cost) {
      return NextResponse.json(
        {
          error:
            "Para finalizar uma ordem de serviço, você deve informar o custo final.",
        },
        { status: 400 }
      );
    }
    if (final_cost && order_status !== "FINALIZADO") {
      return NextResponse.json(
        {
          error:
            "Não é possível informar o custo final de uma ordem de serviço não finalizada.",
        },
        { status: 400 }
      );
    }

    // objeto com as novas informações da ordem de serviço
    const newServiceOrderData = {
      deadline_date: body.deadline_date ? new Date(body.deadline_date) : null,
      order_description,
      estimated_cost:
        body.estimated_cost !== null ? parseFloat(body.estimated_cost) : null,
      final_cost: body.final_cost !== null ? parseFloat(body.final_cost) : null,
      order_status,
    };

    // atualiza os dados no banco
    const updateOrder = await prisma.service_order.update({
      where: {
        id: orderID,
      },
      data: newServiceOrderData,
    });

    return NextResponse.json(updateOrder, { status: 200 });
  } catch (err) {
    console.log(err);
    // prisma code para dado não localizado
    if (err.code === "P2025")
      return NextResponse.json(
        { error: "Ordem de serviço não localizada" },
        { status: 404 }
      );
    return NextResponse.json(
      { error: "Erro ao atualizar a ordem de serviço." },
      { status: 500 }
    );
  }
}

// método DELETE para excluir uma ordem de serviço correspondente ao ID passado
export async function DELETE(request, { params }) {
  const { id: orderID } = await params;

  try {
    // deletando ordem de serviço
    await prisma.service_order.delete({
      where: {
        id: orderID,
      },
    });

    return NextResponse.json(
      { message: "Ordem de serviço excluída com sucesso." },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    // prisma code para dado não localizado
    if (err.code === "P2025")
      return NextResponse.json(
        { error: "Ordem de serviço não localizada" },
        { status: 404 }
      );
    // erro genérico
    return NextResponse.json(
      { error: "Erro ao deletar a ordem de serviço." },
      { status: 500 }
    );
  }
}

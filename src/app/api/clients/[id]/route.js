/**
 * Nome do arquivo: [id]/route.js
 * Data de criação: 13/09/2025
 * Autor: João Pompeu
 * Matrícula: 01748208
 *
 * Descrição:
 *
 * Criação do endpoint dinâmico '/clients/[id]' com suas rotas:
 * GET /clients/[id]: busca e retorna o cliente correspondente ao ID
 * PUT /clients/[id]: busca e atualiza o cliente indicado pelo ID
 * DELETE /clients/[id]: busca e deleta o cliente indicado pelo ID
 *
 * Este script é parte o curso de ADS.
 */

import { prisma } from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

// método GET para buscar um cliente específico
export async function GET(request, { params }) {
  // desestruturando params
  const { id: clientID } = await params;

  try {
    // caso o ID seja válido, procura o ID no banco e retorna o cliente específico
    const client = await prisma.client.findUnique({
      where: { id: clientID },
      include: { service_orders: true }, // retorna as ordens de serviços associadas ao cliente
    });

    // caso o ID não corresponda a nenhum cliente cadastrado, retorna erro 404 not found
    if (!client)
      return NextResponse.json(
        { error: "Cliente não encontrado." },
        { status: 404 }
      );

    return NextResponse.json(client, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao localizar cliente" },
      { status: 500 }
    );
  }
}

// método PUT para atualizar dados do cliente
export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    // desestruturação do body e params
    const { name, address, phone, email } = body;
    const { id: clientID } = await params;

    // valida os campos individualmente
    if (!name || !address || !phone || !email) {
      return NextResponse.json(
        { error: "Todos os campos devem ser preenchidos." },
        { status: 400 }
      );
    }

    // após a validação, atualiza os dados do cliente
    const updatedClient = await prisma.client.update({
      where: { id: clientID },
      data: {
        name,
        address,
        phone,
        email,
      },
    });

    return NextResponse.json(updatedClient, { status: 200 });
  } catch (error) {
    // error.code fornecido pelo prisma para especificar o erro
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Cliente não encontrado" },
        { status: 404 }
      );
    }

    // error.code fornecido pelo prisma para especificar o erro
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Email já está em uso por outro cliente." },
        { status: 409 }
      );
    }

    // erro genérico
    return NextResponse.json(
      { error: "Erro ao atualizar cliente." },
      { status: 500 }
    );
  }
}

// método DELETE para deletar cliente
export async function DELETE(request, { params }) {
  // desestruturando params
  const { id: clientID } = await params;

  try {
    // deletando cliente
    await prisma.client.delete({
      where: { id: clientID },
    });

    return NextResponse.json(
      { message: "Cliente deletado com sucesso." },
      { status: 200 }
    );
  } catch (error) {
    // error.code fornecido pelo prisma para especificar o erro
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Cliente não encontrado" },
        { status: 404 }
      );
    }

    // evita que um cliente que possua ordens criadas seja excluído
    // obedece à regra: REFERENCES client(id) ON DELETE RESTRICT ON UPDATE CASCADE do banco de dados
    if (error.code === "P2003") {
      return NextResponse.json(
        {
          error:
            "Não é possível excluir clientes que possuem ordens de serviço criadas.",
        },
        { status: 400 }
      );
    }
    // erro genérico
    return NextResponse.json(
      { error: "Erro ao deletar cliente" },
      { status: 500 }
    );
  }
}

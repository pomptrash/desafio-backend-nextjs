/**
 * Nome do arquivo: clients/route.js
 * Data de criação: 13/09/2025
 * Autor: João Pompeu
 * Matrícula: 01748208
 *
 * Descrição:
 * 
 * Criação do endpoint '/clients' com suas rotas:
 * GET /clients: busca e retorna todos os clientes cadastrados
 * POST /clients: cadastra um novo cliente no banco
 *
 * Este script é parte o curso de ADS.
 */

import { prisma } from "../../../../lib/prisma";
import { getClients } from "../../../../services/clientServices";
import { NextResponse } from "next/server";

// método GET para buscar todos os clientes
export async function GET() {
  try {
    const clients = await getClients()
    return NextResponse.json(clients, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao requisitar dados." },
      { status: 500 }
    );
  }
}


// método POST para criar novo cliente no banco
export async function POST(request) {
  try {
    const body = await request.json();
    // Desestruturando o body para validação dos campos individualmente
    const { name, address, phone, email } = body;

    // Validando os campos
    if (!name || !address || !phone || !email) {
      return NextResponse.json(
        { error: "Todos os campos devem ser preenchidos." },
        { status: 400 }
      );
    }

    // Se passar da validação, cria novo cliente no banco
    const newClient = await prisma.client.create({
      data: {
        name: body.name,
        address: body.address,
        phone: body.phone,
        email: body.email,
      },
    });

    return NextResponse.json(newClient, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao cadastrar novo cliente." },
      { status: 500 }
    );
  }
}

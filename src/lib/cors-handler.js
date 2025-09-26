/**
 * Nome do arquivo: cors-handler.js
 * Data de criação: 25/09/2025
 * Autor: João Pompeu
 * Matrícula: 01748208
 *
 * Descrição:
 * middleware que configura cabeçalhos de CORS para permitir requisição da URL de produção do projeto hospedado na vercel
 *
 * Este script é parte o curso de ADS.
 */
import { NextResponse } from "next/server";

const ALLOWED_ORIGIN = process.env.CORS_ALLOWED_ORIGIN;

// cabeçalhos para controle de acesso
// define a origem e quais métodos são permitidos na requisição  
export const CORS_HEADERS = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// função para lidar com o método HTTP options
export async function handleOptions() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: CORS_HEADERS,
    }
  );
}

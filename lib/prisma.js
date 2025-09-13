/**
 * Nome do arquivo: prisma.js
 * Data de criação: 13/09/2025
 * Autor: João Pompeu
 * Matrícula: 01748208
 *
 * Descrição:
 * Implementação do Singleton Pattern no Prisma Client em ambiente de desenvolvimento.
 * 
 *
 * Este script é parte o curso de ADS.
 */

import { PrismaClient } from "@prisma/client";

// Caso a variável global 'prismaGlobal' ainda não tenha sido inicializada, cria uma nova instância do 'PrismaClient'
export const prisma = globalThis.prismaGlobal ?? new PrismaClient()

// Se estiver em ambiente de desenvolvimento, inicializa a variável global 'prismaGlobal'
if (process.env.NODE_ENV !== 'production'){
    globalThis.prismaGlobal = prisma
}


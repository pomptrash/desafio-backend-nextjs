/**
 * Nome do arquivo: desafioBackendNextJS - CLIENT TABLE SQL SCRIPT.sql
 * Data de criação: 12/09/2025
 * Autor: João Pompeu
 * Matrícula: 01748208
 *
 * Descrição:
 * Arquivo contendo o script SQL da criação da tabela cliente que será utilizada no projeto.
 *
 * Este script é parte o curso de ADS.
 */

CREATE DATABASE IF NOT EXISTS desafioBackendNextJS;
USE desafioBackendNextJS;

CREATE TABLE IF NOT EXISTS client (
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    address VARCHAR(50) NOT NULL,
    phone VARCHAR(11) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
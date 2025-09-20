/**
 * Nome do arquivo: desafioBackendNextJS - CLIENT TABLE SQL SCRIPT.sql
 * Data de criação: 12/09/2025
 * Autor: João Pompeu
 * Matrícula: 01748208
 *
 * Descrição:
 * Arquivo contendo o script SQL da criação das tabelas 'client' e 'service_order' que serão utilizadas no projeto.
 *
 * Este script é parte o curso de ADS.
 */

CREATE DATABASE IF NOT EXISTS desafioBackendNextJS;
USE desafioBackendNextJS;

CREATE TABLE IF NOT EXISTS client (
	id CHAR(36) PRIMARY KEY DEFAULT(UUID()),
    name VARCHAR(50) NOT NULL,
    address VARCHAR(100) NOT NULL,
    phone VARCHAR(11) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS service_order (
	id CHAR(36) PRIMARY KEY DEFAULT(UUID()),
    client_id CHAR(36) NOT NULL,
    deadline_date DATE NULL,
	order_description TEXT NOT NULL,
    estimated_cost DECIMAL(10,2) NULL,
    final_cost DECIMAL(10,2) NULL,
    order_status ENUM('FINALIZADO', 'PENDENTE', 'CANCELADO') NOT NULL DEFAULT 'PENDENTE',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES client(id) ON DELETE RESTRICT ON UPDATE CASCADE
);
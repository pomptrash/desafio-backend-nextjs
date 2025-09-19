/**
 * Nome do arquivo: viaCepApi.js
 * Data de criação: 18/09/2025
 * Autor: João Pompeu
 * Matrícula: 01748208
 *
 * Descrição:
 * Requisição da API VIA CEP para preenchimento do endereço no cadastro do cliente
 * 
 * Este script é parte o curso de ADS.
 */
export async function fetchCEP(cep){
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    return response.json()
    } catch (err) {
        console.log(err)
        alert("CEP não localizado")
    }
}
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
export async function fetchCEP(cep) {
  if (cep?.length > 7) {
    console.log("requisição realizada na VIA CEP");
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

      if (!response.ok) {
        throw new Error("Erro ao buscar CEP.");
      }

      const data = await response.json();
      // caso o CEP informado tenha a quantidade de números correta mas não exista na base de dados
      if (data.erro) {
        // objeto de erro criado para conter o status not found
        const error = new Error("CEP não encontrado");
        error.status = 404;
        throw error;
      }
      return data;
    } catch (err) {
      throw err;
    }
  } else {
    throw new Error("Digite um CEP válido");
  }
}

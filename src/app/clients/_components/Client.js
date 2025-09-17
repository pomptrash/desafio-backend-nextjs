/**
 * Nome do arquivo: Client.js
 * Data de criação: 17/09/2025
 * Autor: João Pompeu
 * Matrícula: 01748208
 *
 * Descrição:
 * Componente 'Client' que será responsável por renderizar uma table row (<tr>) da tabela HTML.
 * O componente recebe como props um objeto com as informações do cliente
 * Cada instância do componente mostrará um cliente cadastrado
 * 
 * Este script é parte o curso de ADS.
 */
export function Client({clientData}) {
  return (
    <tr>
      <td>{clientData?.id}</td>
      <td>{clientData?.name}</td>
      <td>{clientData?.address}</td>
      <td>{clientData?.phone}</td>
      <td>{clientData?.email}</td>
      <td>
        <button>Atualizar</button>
        <button>Deletar</button>
      </td>
    </tr>
  );
}

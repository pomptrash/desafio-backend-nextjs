/**
 * Nome do arquivo: UpdateClient.js
 * Data de criação: 17/09/2025
 * Autor: João Pompeu
 * Matrícula: 01748208
 *
 * Descrição:
 * Componente criado para facilitar a atualização dos dados do cliente
 * Ao clicar em atualizar, renderiza inputs
 * o defaultValue de cada input recebe o valor anterior dos respectivos campos
 *
 *
 * Este script é parte o curso de ADS.
 */
export function UpdateClient({ update, setUpdate, clientData }) {
  const { name, address, phone, email } = clientData ?? {}; // dados atuais do cliente
  return (
    <>
      <td>
        <input placeholder="Nome" defaultValue={name}></input>
      </td>
      <td>
        <input placeholder="Endereço" defaultValue={address}></input>
      </td>
      <td>
        <input placeholder="Telefone" defaultValue={phone}></input>
      </td>
      <td>
        <input placeholder="Email" defaultValue={email}></input>
      </td>
      <td>
        {/* ao confirmar, o update recebe false novamente */}
        <button onClick={() => setUpdate(!update)}>Confirmar</button>
      </td>
    </>
  );
}

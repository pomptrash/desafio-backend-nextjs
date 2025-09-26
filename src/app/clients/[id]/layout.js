/**
 * Nome do arquivo: /clients/[id]/layout.js
 * Data de criação: 21/09/2025
 * Autor: João Pompeu
 * Matrícula: 01748208
 *
 * Descrição:
 * layout para a página de detalhes do cliente
 * ajuda na renderização dinâmica para criar uma nova ordem de serviço
 *
 * Este script é parte o curso de ADS.
 */
import { getOneClient } from "../../../services/clientServices";
export default async function LayoutClientDetails({ children, params }) {
  const { id } = await params;
  const client = await getOneClient(id);

  return (
    <section>
      <h2 className="service-owner">{client?.name}</h2>
      {children}
    </section>
  );
}

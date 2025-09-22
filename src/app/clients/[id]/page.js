/**
 * Nome do arquivo: /clients/[id]/page.js
 * Data de criação: 20/09/2025
 * Autor: João Pompeu
 * Matrícula: 01748208
 *
 * Descrição:
 * página para mostrar detalhes do cliente.
 * na página /clients, ao clicar no botão 'ordens de serviço', o site é redirecionado para essa página
 * apresenta informações dinâmicas de acordo com o id do cliente
 *
 * Este script é parte o curso de ADS.
 */
import Link from "next/link";
import { getOneClient } from "../../../../services/clientServices";
import { ServiceOrder } from "./_components/ServiceOrder";
export default async function ClientDetails({ params }) {
  const { id } = await params;
  const client = await getOneClient(id);

  return (
    <section>
      <button>
        <Link href={`./${id}/new-service-order`}>
          Criar nova ordem de serviço
        </Link>
      </button>
      {client.service_orders.length === 0 ? (
        <p>Cliente não possui ordens de serviço.</p>
      ) : (
        client.service_orders &&
        client.service_orders.map((service_order, index) => (
          <ServiceOrder
            key={service_order.id}
            serviceOrderData={service_order}
            index={index}
          />
        ))
      )}
    </section>
  );
}

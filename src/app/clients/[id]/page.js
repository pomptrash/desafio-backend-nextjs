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
import { getOneClient } from "../../../../services/clientServices";
export default async function ClientDetails({ params }) {
  const { id } = params;

  try {
    const client = await getOneClient(id);

    return (
      <section>
        <p>{client?.name}</p>
        <section>
          {client.service_orders.length === 0 && (
            <p>Cliente não possui ordens de serviços.</p>
          )}
          {client.service_orders &&
            client.service_orders.map((service_order, index) => (
              <div key={service_order.id}>
                <h3>Serviço {index + 1}</h3>
                <ul>
                  <li>Descrição: {service_order.order_description}</li>
                  <li>Prazo: {service_order.deadline_date}</li>
                  <li>Custo estimado: {service_order.estimated_cost}</li>
                  <li>Status: {service_order.order_status}</li>
                  <li>
                    Curso final:{" "}
                    {service_order.final_cost ? service_order.final_cost : "?"}
                  </li>
                </ul>
                <button>Atualizar</button>
                <button>Cancelar</button>
                <button>Excluir</button>
              </div>
            ))}
        </section>

        <button>Criar nova ordem de serviço</button>
      </section>
    );
  } catch (err) {
    console.log("Erro ao carregar detalhes:", err);
    alert("Erro ao tentar acessar detalhes do cliente.");
  }
}

/**
 * Nome do arquivo: ServiceOrder.js
 * Data de criação: 21/09/2025
 * Autor: João Pompeu
 * Matrícula: 01748208
 *
 * Descrição:
 * Componente para apresentar detalhes da ordem de serviço
 * Recebe as informações via props e renderiza no front
 *
 * Este script é parte o curso de ADS.
 */
"use client";
import { useRouter } from "next/navigation";
import { deleteServiceOrder } from "../../../../../services/orderServices";
import { useState } from "react";
import { UpdateServiceOrder } from "./UpdateServiceOrder";

export function ServiceOrder({ serviceOrderData, index }) {
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  const {
    id,
    order_description,
    deadline_date,
    estimated_cost,
    order_status,
    final_cost,
    createdAt,
  } = serviceOrderData;

  async function handleOrderDelete() {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir a ordem de serviço?"
    );

    if (confirmed) {
      try {
        await deleteServiceOrder(id);
        console.log("serviceOrderData", id);
        router.refresh();
        alert("Ordem de serviço deleta com sucesso.");
      } catch (err) {
        alert("Erro ao deletar ordem de serviço");
      }
    }
  }
  return (
    <section>
      <div>
        <h3>Serviço {index + 1}</h3>
        <p>criada em: {createdAt.split("T")[0]}</p>
        {updating ? (
          <UpdateServiceOrder
            serviceOrderData={serviceOrderData}
            updating={updating}
            setUpdating={setUpdating}
          />
        ) : (
          <div>
            <ul>
              <li>Descrição: {order_description}</li>
              <li>Prazo: {deadline_date.split("T")[0]}</li>
              <li>Custo estimado: {parseFloat(estimated_cost).toFixed(2)}</li>
              <li>Status: {order_status}</li>
              <li>
                Curso final:
                {final_cost ? final_cost : "?"}
              </li>
            </ul>
            <button onClick={() => setUpdating(!updating)}>Atualizar</button>
            <button onClick={() => handleOrderDelete()}>Excluir</button>
          </div>
        )}
      </div>
    </section>
  );
}

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
  // ao clicar em atualizar, esse state recebe true e renderiza o componente com os inputs para alteração dos dados
  const [updating, setUpdating] = useState(false);

  // router para rendirecionar página após criação de nova ordem de serviço
  const router = useRouter();

  // desestruturação das informações da orgem para tratamento no componente dinâmico
  const {
    id,
    order_description,
    deadline_date,
    estimated_cost,
    order_status,
    final_cost,
    createdAt,
  } = serviceOrderData;

  // função para deletar ordem de serviço
  async function handleOrderDelete() {
    // confirmação do usuário para deletar
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir a ordem de serviço?"
    );

    // se confirmado
    if (confirmed) {
      try {
        // faz a requisição de DELETE
        await deleteServiceOrder(id);
        // se ok, atualiza a página para mostrar listagem de ordens atualizada
        router.refresh();
        alert("Ordem de serviço deleta com sucesso.");
      } catch (err) {
        console.log(err)
        alert(err.message);
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
              <li>Prazo: {deadline_date?.split("T")[0]}</li>
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

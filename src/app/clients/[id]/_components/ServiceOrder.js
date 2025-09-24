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
import { Pencil, Trash } from "lucide-react";

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
    updatedAt
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
        console.log(err);
        alert(err.message);
      }
    }
  }
  return (
    <div className={`service-order-card ${order_status}`}>
      <h3 className="service-order-title">Serviço {index + 1}</h3>
      <p className="service-order-created">
        criada em: {new Date(createdAt).toLocaleString('pt-BR')}
      </p>
      <p className="service-order-created">
        atualizada em: {new Date(updatedAt).toLocaleString('pt-BR')}
      </p>
      {updating ? (
        <UpdateServiceOrder
          serviceOrderData={serviceOrderData}
          updating={updating}
          setUpdating={setUpdating}
        />
      ) : (
        <div>
          <ul className="service-order-ul">
            <li className="service-order-desc">
              {order_description.toUpperCase()}
            </li>
            <li className="service-order-li">
              Prazo: {deadline_date?.split("T")[0]}
            </li>
            <li className="service-order-li">
              Custo estimado: {parseFloat(estimated_cost).toFixed(2)}
            </li>
            <li className="service-order-li flex flex-row gap-1">Status: <span  className="status-text" data-status={order_status}>{order_status}</span></li>
            {final_cost && (
              <li className="service-order-li">
                Curso final: {final_cost}
              </li>
            )}
          </ul>
          <button className="btn mt-3" onClick={() => setUpdating(!updating)}>
            <Pencil />
          </button>
          <button className="btn mx-1 mt-3" onClick={() => handleOrderDelete()}>
            <Trash />
          </button>
        </div>
      )}
    </div>
  );
}

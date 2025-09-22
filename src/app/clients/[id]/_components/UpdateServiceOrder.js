/**
 * Nome do arquivo: ServiceOrder.js
 * Data de criação: 21/09/2025
 * Autor: João Pompeu
 * Matrícula: 01748208
 *
 * Descrição:
 * Componente dinâmico para atualizar informações da ordem de serviço
 *
 * Este script é parte o curso de ADS.
 */

"use client";
import { useState } from "react";
import { updateServiceOrder } from "../../../../../services/orderServices";
import { useRouter } from "next/navigation";
export function UpdateServiceOrder({
  serviceOrderData,
  updating,
  setUpdating,
}) {
  // pega data atual para limitar o input de data, não permitindo uma data que já passou
  const today = new Date().toISOString().split("T")[0];
  const router = useRouter();

  const {
    id,
    order_description,
    deadline_date,
    estimated_cost,
    order_status,
    final_cost,
  } = serviceOrderData;

  const [newDescription, setNewDescription] = useState(order_description);
  const [newDeadlineDate, setNewDeadlineDate] = useState(deadline_date);
  const [newEstimatedCost, setNewEstimatedCost] = useState(estimated_cost);
  const [newStatus, setNewStatus] = useState(order_status);
  const [newFinalCost, setNewFinalCost] = useState(final_cost);

  const newServiceOrderData = {
    order_description: newDescription,
    deadline_date: newDeadlineDate,
    estimated_cost: newEstimatedCost,
    order_status: newStatus,
    final_cost: newFinalCost,
  };

  async function handleUpdate() {
    try {
      const updated = await updateServiceOrder(id, newServiceOrderData);
      if (updated) {
        alert("Ordem de serviço atualizada com sucesso.");
        setUpdating(!updating);
        router.refresh();
      }
    } catch (err) {
      alert(err);
    }
  }
  return (
    <div>
      <ul>
        <li>
          Descrição:{" "}
          <input
            defaultValue={order_description}
            placeholder="Descrição"
            required
            onChange={(e) => setNewDescription(e.target.value)}
          ></input>
        </li>
        <li>
          Prazo:
          <input
            defaultValue={deadline_date}
            placeholder="Prazo"
            type="date"
            min={today}
            onKeyUp={(e) => e.preventDefault()}
            onKeyDown={(e) => e.preventDefault()}
            onChange={(e) => setNewDeadlineDate(e.target.value)}
            required
          ></input>
        </li>
        <li>
          Custo estimado:{" "}
          <input
            defaultValue={estimated_cost}
            placeholder="Custo Estimado"
            type="number"
            min="0"
            step="0.01"
            onChange={(e) => setNewEstimatedCost(e.target.value)}
            required
          ></input>
        </li>
        <li>
          Status:{" "}
          <select
            defaultValue={order_status}
            required
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value="PENDENTE">PENDENTE</option>
            <option value="FINALIZADO">FINALIZADO</option>
            <option value="CANCELADO">CANCELADO</option>
          </select>
        </li>
        <li>
          Curso final:{" "}
          <input
            defaultValue={final_cost}
            placeholder="Custo Final"
            type="number"
            min="0"
            step="0.01"
            onChange={(e) => setNewFinalCost(e.target.value)}
            required
          ></input>
        </li>
      </ul>
      <button onClick={() => handleUpdate()}>Confirmar</button>
      <button onClick={() => setUpdating(!updating)}>Cancelar</button>
    </div>
  );
}

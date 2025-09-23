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
  // router para atualizar a página após a atualização
  const router = useRouter();

  // desestruturando objeto com as informações atuais da ordem de serviço
  const {
    id,
    order_description,
    deadline_date,
    estimated_cost,
    order_status,
    final_cost,
  } = serviceOrderData;

  // passa os valores atuais como padrão para os states que irão receber os novos valores
  const [newDescription, setNewDescription] = useState(order_description);
  const [newDeadlineDate, setNewDeadlineDate] = useState(deadline_date);
  const [newEstimatedCost, setNewEstimatedCost] = useState(estimated_cost);
  const [newStatus, setNewStatus] = useState(order_status);
  const [newFinalCost, setNewFinalCost] = useState(final_cost);

  async function handleUpdate() {
    // validando novos dados
    if (!newDescription || !newDeadlineDate || !newEstimatedCost) {
      alert("Preencha todos os campos");
      return;
    }

    if (newEstimatedCost < 0) {
      alert("Custo estimado não pode ser menor que zero");
      return;
    }

    if (newStatus === "FINALIZADO" && !newFinalCost) {
      alert(
        "Para finalizar uma ordem de serviço, é necessário informar o custo final."
      );
      return;
    }

    if (newFinalCost && newFinalCost < 0) {
      alert("Custo final não pode ser menor que zero");
      return;
    }

    // cria objeto com os novos dados após as validações
    const newServiceOrderData = {
      order_description: newDescription,
      deadline_date: newDeadlineDate,
      estimated_cost: newEstimatedCost,
      order_status: newStatus,
      final_cost: newFinalCost,
    };
    // a requisição de update é feita na api
    try {
      const updated = await updateServiceOrder(id, newServiceOrderData);
      alert("Ordem de serviço atualizada com sucesso.");
      setUpdating(!updating);
      // se ok, atualiza a página para mostrar os novos dados
      router.refresh();
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }
  return (
    <div>
      <h4>Atualize as informações</h4>
      <ul>
        <li>
          Descrição:{" "}
          <input
            defaultValue={order_description}
            placeholder="Descrição (Obrigatório)"
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
            placeholder="Custo Estimado (Obrigatório)"
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

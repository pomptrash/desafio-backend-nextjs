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
import { updateServiceOrder } from "../../../../services/orderServices";
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
    <div className="update-service-order-container">
      <h4 className="update-title">Atualize as informações</h4>
      <ul className="update-service-ul">
        <li className="service-order-li">
          <label className="service-input-label" htmlFor="description">
            Descrição
          </label>
          <input
            id="description"
            className="input"
            defaultValue={order_description}
            placeholder="Descrição (Obrigatório)"
            required
            onChange={(e) => setNewDescription(e.target.value)}
          ></input>
        </li>
        <li className="service-order-li">
          <label className="service-input-label" htmlFor="deadline">
            Prazo:
          </label>
          <input
            className="input"
            id="deadline"
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
        <li className="service-order-li">
          <label className="service-input-label" htmlFor="estimated">
            Custo estimado
          </label>
          <input
            id="estimated"
            className="input"
            defaultValue={estimated_cost}
            placeholder="Custo Estimado (Obrigatório)"
            type="number"
            min="0"
            step="0.01"
            onChange={(e) => setNewEstimatedCost(e.target.value)}
            required
          ></input>
        </li>
        <li className="service-order-li">
          <label className="service-input-label" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            className="select"
            defaultValue={order_status}
            required
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option className="select-option" value="PENDENTE">
              PENDENTE
            </option>
            <option className="select-option" value="FINALIZADO">
              FINALIZADO
            </option>
            <option className="select-option" value="CANCELADO">
              CANCELADO
            </option>
          </select>
        </li>
        <li className="service-order-li">
          <label className="service-input-label" htmlFor="finalCost">
            Custo final
          </label>
          <input
            id="finalCost"
            className="input"
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
      <button className="btn mt-3" onClick={() => handleUpdate()}>
        Confirmar
      </button>
      <button className="btn mx-1 mt-3" onClick={() => setUpdating(!updating)}>
        Cancelar
      </button>
    </div>
  );
}

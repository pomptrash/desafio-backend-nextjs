/**
 * Nome do arquivo: [id]/new-service-order/page.js
 * Data de criação: 21/09/2025
 * Autor: João Pompeu
 * Matrícula: 01748208
 *
 * Descrição:
 * Rota para criação de nova ordem de serviço
 * 
 * Este script é parte o curso de ADS.
 */
 
"use client";
import { createNewServiceOrder } from "../../../../../services/orderServices";
import { use, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewServiceOrder({ params }) {
  const { id } = use(params);

  const router = useRouter();
  const [orderDescription, setOrderDescription] = useState();
  const [estimatedCost, setEstimatedCost] = useState();
  const [deadlineDate, setDeadlineDate] = useState();

  // pega data atual para limitar o input de data, não permitindo uma data que já passou
  const today = new Date().toISOString().split("T")[0];

  async function handleCreate() {
    const newServiceOrderData = {
      client_id: id,
      deadline_date: deadlineDate,
      order_description: orderDescription,
      estimated_cost: parseFloat(estimatedCost).toFixed(2),
    };

    try {
      const created = await createNewServiceOrder(newServiceOrderData);

      if (created) {
        alert("Nova ordem de serviço criada com sucesso.");
        router.replace(`/clients/${id}`);
      } else {
        alert("Erro ao criar nova ordem");
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }

  return (
    <section>
      <h2>Nova ordem de serviço</h2>
      <form>
        <input
          placeholder="Descrição"
          onChange={(e) => setOrderDescription(e.target.value)}
          required
        ></input>
        <input
          placeholder="Custo Estimado"
          type="number"
          min="0"
          step="0.01"
          onChange={(e) => setEstimatedCost(e.target.value)}
          required
        ></input>
        <label>
          Prazo:{" "}
          <input
            placeholder="Prazo"
            type="date"
            min={today}
            onKeyUp={(e) => e.preventDefault()}
            onKeyDown={(e) => e.preventDefault()}
            onChange={(e) => setDeadlineDate(e.target.value)}
            required
          ></input>
        </label>
        <button
          onClick={(e) => {
            e.preventDefault(), handleCreate();
          }}
        >
          Criar ordem de serviço
        </button>
      </form>
    </section>
  );
}

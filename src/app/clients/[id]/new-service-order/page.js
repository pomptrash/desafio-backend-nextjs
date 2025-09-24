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
import Link from "next/link";

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

    // validando os dados
    if (
      !newServiceOrderData.client_id ||
      !newServiceOrderData.deadline_date ||
      !newServiceOrderData.order_description ||
      !newServiceOrderData.estimated_cost
    ) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    if (estimatedCost < 0) {
      alert("Custo estimado não pode ser menor que zero");
      return;
    }

    // faz a requisição caso os dados tenham sido validados
    try {
      await createNewServiceOrder(newServiceOrderData);
      alert("Nova ordem de serviço criada com sucesso.");
      // se ok, a página é redirecionada para a listagem de ordens criadas.
      router.replace(`/clients/${id}`);
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }

  return (
    <section>
      <button className="btn">
        <Link href={`./`}>Cancelar</Link>
      </button>
      <h2 className="service-h2">Nova ordem de serviço</h2>
      <form className="new-service-form">
        <input
          className="input form-input"
          placeholder="Descrição (Obrigatório)"
          onChange={(e) => setOrderDescription(e.target.value)}
          required
        ></input>
        <input
          className="input form-input"
          placeholder="Custo Estimado (Obrigatório)"
          type="number"
          min="0"
          step="0.01"
          onChange={(e) => setEstimatedCost(e.target.value)}
          required
        ></input>
        <label>
          <label className="service-input-label" htmlFor="prazo">
            Prazo:
          </label>
          <input
            className="input"
            id="prazo"
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
          className="btn"
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

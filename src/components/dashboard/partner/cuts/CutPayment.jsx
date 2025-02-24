"use client";

import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAppContext } from "@/context/appContext";
import SubmitButton from "@/components/common/buttons/SubmitButton";
import { useRouter, useParams } from "next/navigation";

function CutPayment() {
  const [isLoading, setIsLoading] = useState(false);
  const { setErrorMessage, setSuccessMessage } = useAppContext();
  const router = useRouter();
  const params = useParams();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Realizar el POST a la API para crear el pago por reconexión
      const response = await axios.post(
        `/api/dashboard/search/${params.PK_partner}/cuts/${params.PK_cut}`,
        {
          amount: data.amount,
          paymentDate: data.paymentDate,
        }
      );

      setSuccessMessage(response.data.message);
      reset();
      setTimeout(() => {
        router.back(); // Redirige a la vista anterior
      }, 2000);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response?.data?.error || "Ocurrió un error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="grid gap-4">
      <section className="p-4 bg-white shadow-md grid gap-4 rounded-md">
        <h1 className="font-medium text-2xl pb-4 border-b">
          Registrar Pago por Reconexión
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-2 text-zinc-700"
        >
          {/* Monto */}
          <label className="flex flex-col gap-1">
            Monto Bs *
            <input
              type="number"
              className="input"
              placeholder="Ej: 500"
              {...register("amount", {
                required: {
                  value: true,
                  message: "El monto es obligatorio",
                },
                min: {
                  value: 1,
                  message: "El monto debe ser mayor a 0",
                },
              })}
            />
            {errors.amount && (
              <span className="text-sm text-red-500">{errors.amount.message}</span>
            )}
          </label>

          {/* Fecha de Pago */}
          <label className="flex flex-col gap-1">
            Fecha de Pago *
            <input
              type="datetime-local"
              className="input"
              {...register("paymentDate", {
                required: {
                  value: true,
                  message: "La fecha de pago es obligatoria",
                },
              })}
            />
            {errors.paymentDate && (
              <span className="text-sm text-red-500">{errors.paymentDate.message}</span>
            )}
          </label>

          {/* Botón de Envío */}
          <section className="md:col-span-2 flex flex-col md:flex-row mt-4 items-center justify-between border-t pt-4 gap-4">
            <p className="text-zinc-500">
              Los campos con{" "}
              <span className="text-red-500 text-xl font-bold">*</span> son
              obligatorios.
            </p>
            <SubmitButton isLoading={isLoading} name="Registrar Pago" />
          </section>
        </form>
      </section>
    </section>
  );
}

export default CutPayment;

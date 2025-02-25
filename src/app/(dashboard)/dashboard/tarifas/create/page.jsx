"use client";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAppContext } from "@/context/appContext";
import SubmitButton from "@/components/common/buttons/SubmitButton";
import { useRouter } from "next/navigation";

function CreateFarePage() {
  const [isLoading, setIsLoading] = useState(false);
  const { setErrorMessage, setSuccessMessage } = useAppContext();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/dashboard/fares", {
        userType: data.userType,
        amount: Number(data.amount),
        status: Boolean(data.status),
      });

      setSuccessMessage(response.data.message);
      reset();
      setTimeout(() => {
        router.back();
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
      <section className="p-4 bg-zinc-900 shadow-md grid gap-4 rounded-md">
        <h1 className="font-medium text-2xl pb-4 border-b border-zinc-700 text-white">
          Registrar Tarifa
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-3 gap-2 text-zinc-300"
        >
          {/* Tipo de Usuario */}
          <label className="flex flex-col gap-1">
            Tipo de Usuario *
            <input
              type="text"
              className="input"
              {...register("userType", { required: "Campo requerido" })}
            />
            {errors.userType && (
              <span className="text-sm text-red-500">
                {errors.userType.message}
              </span>
            )}
          </label>

          {/* Monto */}
          <label className="flex flex-col gap-1">
            Monto *
            <input
              type="number"
              step="0.01"
              className="input"
              {...register("amount", {
                required: "Campo requerido",
                min: { value: 0, message: "El monto no puede ser negativo" },
              })}
            />
            {errors.amount && (
              <span className="text-sm text-red-500">
                {errors.amount.message}
              </span>
            )}
          </label>

          {/* Botón de Envío */}
          <section className="md:col-span-3 flex flex-col md:flex-row mt-4 items-center justify-between border-t border-zinc-700 pt-4 gap-4">
            <p className="text-zinc-400">
              Los campos con{" "}
              <span className="text-red-500 text-xl font-bold">*</span> son
              obligatorios.
            </p>
            <SubmitButton isLoading={isLoading} name="Registrar" />
          </section>
        </form>
      </section>
    </section>
  );
}

export default CreateFarePage;

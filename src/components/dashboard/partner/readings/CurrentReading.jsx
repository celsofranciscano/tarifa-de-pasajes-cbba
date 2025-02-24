"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAppContext } from "@/context/appContext";
import SubmitButton from "@/components/common/buttons/SubmitButton";
import { useRouter } from "next/navigation";

function CurrentReading({ lastReading, params }) {
  const [isLoading, setIsLoading] = useState(false);
  const { setErrorMessage, setSuccessMessage } = useAppContext();
  const [prices, setPrices] = useState(null);
  const router = useRouter();
  console.log(lastReading);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const priceResponse = await axios.get(`/api/dashboard/prices`);
        setPrices(priceResponse.data);
      } catch (error) {
        setErrorMessage("Error al cargar tarifa de los m³");
      }
    };
    fetchData();
  }, []);

  const currentReading = watch("currentReading", "");
  const previousReading = watch(
    "previousReading",
    lastReading?.currentReading || ""
  );

  useEffect(() => {
    if (currentReading !== "" && previousReading !== "") {
      const cubicMeters = Math.max(0, currentReading - previousReading);
      setValue("cubicMeters", cubicMeters);
      calculatePrice(cubicMeters);
    }
  }, [currentReading, previousReading]);

  const calculatePrice = (cubicMeters) => {
    if (!prices) return;
    let totalPrice = 0;

    for (const priceTier of prices) {
      if (
        cubicMeters >= priceTier.min_cubes &&
        cubicMeters <= priceTier.max_cubes
      ) {
        totalPrice = priceTier.fixed_price
          ? priceTier.price
          : cubicMeters * priceTier.price;
        break;
      }
    }
    setValue("pricing", totalPrice);
  };

  const onSubmit = async (data) => {
    if (data.currentReading < data.previousReading && !data.description) {
      setErrorMessage(
        "Debe ingresar una descripción si la lectura es menor a la anterior."
      );
      return;
    }

    // Validar diferencia de lecturas no mayor a 500
    if (Math.abs(data.currentReading - data.previousReading) > 500) {
      setErrorMessage("La diferencia entre la lectura actual y la anterior no puede ser mayor a 500.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `/api/dashboard/search/${params.PK_partner}/readings/`,
        data
      );
      setSuccessMessage(response.data.message);
      reset();
      setTimeout(
        () => router.push(`/dashboard/search/${params.PK_partner}/readings`),
        2000
      );
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Ocurrió un error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="grid gap-2">
      <section className="p-4 bg-white shadow-md grid gap-4 rounded-md">
        <h1 className="font-medium text-xl pb-4 border-b">
          Nueva lecturación -{" "}
          <span className="font-bold">
            {new Date(new Date().setMonth(new Date().getMonth() - 1))
              .toLocaleString("es-ES", { month: "long", year: "numeric" })
              .replace(/^./, (match) => match.toUpperCase())}
          </span>
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 md:grid-cols-3 gap-2 text-zinc-700"
        >
          <label className="flex flex-col gap-1">
            Lectura Anterior *
            <input
              type="number"
              autoFocus
              className="input"
              {...register("previousReading", {
                required: "Este campo es obligatorio.",
                pattern: {
                  value: /^\d{1,4}$/,
                  message: "Debe tener máximo 4 dígitos.",
                },
                min: { value: 0, message: "No puede ser negativa." },
              })}
              defaultValue={lastReading?.currentReading || ""}
              placeholder="4550"
            />
            {errors.previousReading && (
              <span className="text-red-500">
                {errors.previousReading.message}
              </span>
            )}
          </label>

          <label className="flex flex-col gap-1">
            Lectura Actual *
            <input
              type="number"
              className="input"
              {...register("currentReading", {
                required: "Este campo es obligatorio.",
                pattern: {
                  value: /^\d{1,4}$/,
                  message: "Debe tener máximo 4 dígitos.",
                },
                min: { value: 0, message: "No puede ser negativa." },
              })}
              defaultValue={lastReading?.currentReading || ""}
              placeholder="4600"
            />
            {errors.currentReading && (
              <span className="text-red-500">
                {errors.currentReading.message}
              </span>
            )}
          </label>

          <label className="flex flex-col gap-1">
            Metros Cúbicos m³ *
            <input
              type="number"
              className="input"
              {...register("cubicMeters", {
                required: "Este campo es obligatorio.",
                min: { value: 0, message: "Debe ser al menos 0." },
                max: { value: 500, message: "Máximo 500 m³." },
              })}
              placeholder="50 m³"
            />
          </label>

          <label className="flex flex-col gap-1">
            Precio Total Bs
            <input
              type="number"
              className="input bg-white"
              {...register("pricing")}
              readOnly
              placeholder="Precio total"
            />
          </label>

          <label className="flex flex-col gap-1 col-span-2">
            Descripción (Opcional)
            <textarea className="input" {...register("description")} placeholder="Descripción" />
          </label>

          <section className="md:col-span-3 col-span-2 flex flex-col md:flex-row mt-4 items-center justify-between border-t pt-4 gap-4">
            <p className="text-zinc-500">
              Los campos con{" "}
              <span className="text-red-500 text-xl font-bold">*</span> son
              obligatorios.
            </p>
            <SubmitButton isLoading={isLoading} name="Registrar lecturación" />
          </section>
        </form>
      </section>
    </section>
  );
}

export default CurrentReading;

"use client";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAppContext } from "@/context/appContext";
import SubmitButton from "@/components/common/buttons/SubmitButton";
import { useRouter } from "next/navigation";

function CreateTransportLinePage() {
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
      const response = await axios.post("/api/dashboard/transportline", {
        name: data.name,
        route: data.route,
        association: data.association,
        representative: data.representative,
        contactNumber: data.contactNumber,
        startLocation: data.startLocation,
        endLocation: data.endLocation,
        description: data.description,
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
          Registrar Línea de Transporte
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-3 gap-2 text-zinc-300"
        >
          {/* Nombre de la Línea */}
          <label className="flex flex-col gap-1">
            Nombre de la Línea *
            <input
              type="text"
              className="input"
              {...register("name", { required: "Campo requerido" })}
            />
            {errors.name && (
              <span className="text-sm text-red-500">{errors.name.message}</span>
            )}
          </label>

          {/* Ruta */}
          <label className="flex flex-col gap-1">
            Ruta 
            <input
              type="text"
              className="input"
              {...register("route")}
            />
            {errors.route && (
              <span className="text-sm text-red-500">{errors.route.message}</span>
            )}
          </label>

          {/* Asociación */}
          <label className="flex flex-col gap-1">
            Asociación 
            <input
              type="text"
              className="input"
              {...register("association")}
            />
            {errors.association && (
              <span className="text-sm text-red-500">{errors.association.message}</span>
            )}
          </label>

          {/* Representante */}
          <label className="flex flex-col gap-1">
            Representante 
            <input
              type="text"
              className="input"
              {...register("representative")}
            />
            {errors.representative && (
              <span className="text-sm text-red-500">{errors.representative.message}</span>
            )}
          </label>

          {/* Número de Contacto */}
          <label className="flex flex-col gap-1">
            Número de Contacto 
            <input
              type="tel"
              className="input"
              {...register("contactNumber", {
             
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Solo se permiten números",
                },
              })}
            />
            {errors.contactNumber && (
              <span className="text-sm text-red-500">{errors.contactNumber.message}</span>
            )}
          </label>

          {/* Ubicación de Inicio */}
          <label className="flex flex-col gap-1">
            Ubicación de Inicio 
            <input
              type="text"
              className="input"
              {...register("startLocation")}
            />
            {errors.startLocation && (
              <span className="text-sm text-red-500">{errors.startLocation.message}</span>
            )}
          </label>

          {/* Ubicación de Fin */}
          <label className="flex flex-col gap-1">
            Ubicación de Fin 
            <input
              type="text"
              className="input"
              {...register("endLocation")}
            />
            {errors.endLocation && (
              <span className="text-sm text-red-500">{errors.endLocation.message}</span>
            )}
          </label>

          {/* Descripción */}
          <label className="flex flex-col gap-1 md:col-span-2">
            Descripción *
            <textarea
              className="input"
              {...register("description", { required: "Campo requerido" })}
            />
            {errors.description && (
              <span className="text-sm text-red-500">{errors.description.message}</span>
            )}
          </label>

          {/* Botón de Envío */}
          <section className="md:col-span-2 flex flex-col md:flex-row mt-4 items-center justify-between border-t border-zinc-700 pt-4 gap-4">
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

export default CreateTransportLinePage;

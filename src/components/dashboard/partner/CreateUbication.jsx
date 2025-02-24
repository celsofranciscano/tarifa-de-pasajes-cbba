"use client";

import { useState } from "react";
import axios from "axios";
import { useAppContext } from "@/context/appContext";
import { useForm } from "react-hook-form";
import SubmitButton from "@/components/common/buttons/SubmitButton";
import { useRouter } from "next/navigation";
function CreateUbication({ params }) {
  const { setErrorMessage, setSuccessMessage } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter()

  const handleLocationSubmit = async (data) => {
    try {
      const [latitude, longitude] = data.coordinates
        .split(",")
        .map((val) => parseFloat(val.trim()));

      if (isNaN(latitude) || isNaN(longitude)) {
        setErrorMessage(
          "Formato de coordenadas inválido. Use el formato: -17.465005, -66.202818"
        );
        return;
      }

      if (
        !/^(-17\.\d{7})$/.test(latitude) ||
        !/^(-66\.\d{7})$/.test(longitude)
      ) {
        setErrorMessage(
          "Latitud debe ser -17.xxxxxx y Longitud -66.xxxxxx con 7 decimales"
        );
        return;
      }

      const response =await axios.post(`/api/dashboard/search/${params.PK_partner}/location`, {
        latitude,
        longitude,
        description: data.description,
        zone: data.zone,
      });
      setSuccessMessage(response.data.message)
      setTimeout(() => {
        router.refresh()
      }, 2000);

    } catch (error) {
      console.log(error);
      setErrorMessage(
        error.response?.data?.error || "Error al guardar la locación"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="grid gap-4">
      <section className="p-4 bg-white shadow-md grid gap-4 rounded-md">
        <h1 className="font-medium text-2xl pb-4 border-b">
          Registrar Ubicación
        </h1>
        <form
          onSubmit={handleSubmit(handleLocationSubmit)}
          className="grid md:grid-cols-3 gap-2 text-zinc-700"
        >
          <label className="flex flex-col gap-1">
            <span>
              Coordenadas (latitud, longitud){" "}
              <span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              className="input pl-3 pr-3"
              placeholder="-17.4650051, -66.2028181"
              {...register("coordinates", {
                required: "Las coordenadas son requeridas",
                pattern: {
                  value: /^-17\.\d{7},\s?-66\.\d{7}$/,
                  message:
                    "Formato inválido. Use 7 decimales, ej: -17.4650051, -66.2028181",
                },
              })}
            />
            {errors.coordinates && (
              <span className="text-red-500">{errors.coordinates.message}</span>
            )}
          </label>



          <label className="flex flex-col gap-1">
            <span>
              Zona{" "}
              <span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              className="input pl-3 pr-3"
              placeholder="OTB El Rosario"
              {...register("zone", {
                required: "La zona es obligatoria",
              
              })}
            />
            {errors.zone && (
              <span className="text-red-500">{errors.zone.message}</span>
            )}
          </label>

          <label className="flex flex-col gap-1">
            <span>Descripción (opcional)</span>
            <textarea
              className="input pl-3 pr-3"
              placeholder="Cerca de la plaza principal"
              {...register("description")}
            />
          </label>

          <section className="md:col-span-3 flex flex-col md:flex-row mt-4 items-center justify-between border-t pt-4 gap-4">
            <p className="text-zinc-500">
              Revisa la información antes de continuar.
            </p>
            <SubmitButton isLoading={isLoading} name="Registrar" />
          </section>
        </form>
      </section>
    </section>
  );
}

export default CreateUbication;

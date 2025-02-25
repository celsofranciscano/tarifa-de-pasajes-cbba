"use client";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAppContext } from "@/context/appContext";
import SubmitButton from "@/components/common/buttons/SubmitButton";
import { useRouter } from "next/navigation";

function CreatePrivilegePage() {
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
      const response = await axios.post("/api/settings/privileges", {
        privilege: data.privilege,
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
        <h1 className="font-medium text-2xl pb-4 border-b">Crear Privilegio</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-3 gap-2 text-zinc-400"
        >
          {/* Nombre del Privilegio */}
          <label className="flex flex-col gap-1 md:col-span-3">
            Nombre del Privilegio *
            <input
              type="text"
              className="input"
              placeholder="Ejemplo: Administrador"
              {...register("privilege", {
                required: {
                  value: true,
                  message: "El nombre del privilegio es obligatorio",
                },
                maxLength: {
                  value: 50,
                  message: "Máximo 50 caracteres",
                },
              })}
            />
            {errors.privilege && (
              <span className="text-sm text-red-500">
                {errors.privilege.message}
              </span>
            )}
          </label>

          {/* Botón de Envío */}
          <section className="md:col-span-3 flex flex-col md:flex-row mt-4 items-center justify-between border-t pt-4 gap-4">
            <p className="text-zinc-500">
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

export default CreatePrivilegePage;

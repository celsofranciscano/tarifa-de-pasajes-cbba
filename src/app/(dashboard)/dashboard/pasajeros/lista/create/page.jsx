"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAppContext } from "@/context/appContext";
import SubmitButton from "@/components/common/buttons/SubmitButton";
import { useRouter } from "next/navigation";

function CreatePassengerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [fares, setFares] = useState([]);
  const { setErrorMessage, setSuccessMessage } = useAppContext();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    async function fetchFares() {
      try {
        const response = await axios.get("/api/dashboard/fares");
        setFares(response.data);
      } catch (error) {
        console.log(error);
        setErrorMessage("Error al cargar las tarifas");
      }
    }
    fetchFares();
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/dashboard/passenger", {
        FK_fare: Number(data.FK_fare),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
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
          Registrar Pasajero
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-2 text-zinc-300"
        >
          {/* Tarifa */}
          <label className="flex flex-col gap-1">
            Tarifa *
            <select className="input" {...register("FK_fare", { required: "Campo requerido" })}>
              <option value="">Seleccione una tarifa</option>
              {fares.map((fare) => (
                <option key={fare.PK_fare} value={fare.PK_fare}>
                  {fare.userType} - Bs {fare.amount}
                </option>
              ))}
            </select>
            {errors.FK_fare && <span className="text-sm text-red-500">{errors.FK_fare.message}</span>}
          </label>

          {/* Nombre */}
          <label className="flex flex-col gap-1">
            Nombre *
            <input type="text" className="input" {...register("firstName", { required: "Campo requerido" })} />
            {errors.firstName && <span className="text-sm text-red-500">{errors.firstName.message}</span>}
          </label>

          {/* Apellido */}
          <label className="flex flex-col gap-1">
            Apellido *
            <input type="text" className="input" {...register("lastName", { required: "Campo requerido" })} />
            {errors.lastName && <span className="text-sm text-red-500">{errors.lastName.message}</span>}
          </label>

          {/* Correo */}
          <label className="flex flex-col gap-1">
            Correo Electrónico *
            <input
              type="email"
              className="input"
              {...register("email", {
                required: "Campo requerido",
                pattern: { value: /^\S+@\S+$/, message: "Correo inválido" },
              })}
            />
            {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
          </label>

          {/* Contraseña */}
          <label className="flex flex-col gap-1">
            Contraseña *
            <input type="password" className="input" {...register("password", { required: "Campo requerido" })} />
            {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
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

export default CreatePassengerPage;

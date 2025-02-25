"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAppContext } from "@/context/appContext";
import SubmitButton from "@/components/common/buttons/SubmitButton";
import { useRouter, useParams } from "next/navigation";

function EditUserPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [privileges, setPrivileges] = useState([]);
  const { setErrorMessage, setSuccessMessage } = useAppContext();
  const router = useRouter();
  const { PK_user } = useParams();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    async function fetchData() {
      try {
        const [userRes, privilegesRes] = await Promise.all([
          axios.get(`/api/settings/users/${PK_user}`),
          axios.get("/api/settings/privileges"),
        ]);
        reset(userRes.data);
        setPrivileges(privilegesRes.data);
      } catch (error) {
        setErrorMessage("Error al cargar los datos");
      }
    }
    fetchData();
  }, [PK_user, reset, setErrorMessage]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await axios.patch(`/api/settings/users/${PK_user}`, data);
      setSuccessMessage("Usuario actualizado correctamente");
      setTimeout(() => {
        router.back();
      }, 2000);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Ocurrió un error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="grid gap-4">
      <section className="p-4 bg-zinc-900 shadow-md grid gap-4 rounded-md">
        <h1 className="font-medium text-2xl pb-4 border-b">Editar Usuario</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-2 text-zinc-400">
          <label className="flex flex-col gap-1">
            Nombre *
            <input
              type="text"
              className="input"
              {...register("firstName", { required: "El nombre es obligatorio" })}
            />
            {errors.firstName && <span className="text-sm text-red-500">{errors.firstName.message}</span>}
          </label>
          <label className="flex flex-col gap-1">
            Apellido *
            <input
              type="text"
              className="input"
              {...register("lastName", { required: "El apellido es obligatorio" })}
            />
            {errors.lastName && <span className="text-sm text-red-500">{errors.lastName.message}</span>}
          </label>
          <label className="flex flex-col gap-1">
            Teléfono
            <input type="text" className="input" {...register("phoneNumber")} />
          </label>
          <label className="flex flex-col gap-1 md:col-span-2">
            Email *
            <input
              type="email"
              className="input"
              {...register("email", { required: "El email es obligatorio" })}
            />
            {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
          </label>
          <label className="flex flex-col gap-1">
            Privilegio *
            <select className="input" {...register("FK_privilege", { required: "Selecciona un privilegio" })}>
              <option value="">Seleccione un privilegio</option>
              {privileges.map((priv) => (
                <option key={priv.PK_privilege} value={priv.PK_privilege}>
                  {priv.privilege}
                </option>
              ))}
            </select>
            {errors.FK_privilege && <span className="text-sm text-red-500">{errors.FK_privilege.message}</span>}
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("status")} /> Activo
          </label>
          <section className="md:col-span-3 flex flex-col md:flex-row mt-4 items-center justify-between border-t pt-4 gap-4">
            <p className="text-zinc-500">
              Los campos con <span className="text-red-500 text-xl font-bold">*</span> son obligatorios.
            </p>
            <SubmitButton isLoading={isLoading} name="Actualizar" />
          </section>
        </form>
      </section>
    </section>
  );
}

export default EditUserPage;

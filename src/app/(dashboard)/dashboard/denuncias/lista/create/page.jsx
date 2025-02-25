"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAppContext } from "@/context/appContext";
import SubmitButton from "@/components/common/buttons/SubmitButton";
import { useRouter } from "next/navigation";

function CreateComplaintPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { setErrorMessage, setSuccessMessage } = useAppContext();
  const router = useRouter();
  const [passengers, setPassengers] = useState([]);
  const [transports, setTransports] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const fetchPassengers = async () => {
      try {
        const response = await axios.get("/api/dashboard/passenger");
        setPassengers(response.data);
      } catch (error) {
        console.error("Error al obtener pasajeros:", error);
      }
    };
    fetchPassengers();
  }, []);

  useEffect(() => {
    const fetchTransports = async () => {
      try {
        const response = await axios.get("/api/dashboard/transportsline");
        setTransports(response.data);
      } catch (error) {
        console.error("Error al obtener transportes:", error);
      }
    };
    fetchTransports();
  }, []);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await axios.get("/api/dashboard/statuscomplaints");
        setStatuses(response.data);
      } catch (error) {
        console.error("Error al obtener estados de denuncia:", error);
      }
    };
    fetchStatuses();
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/dashboard/complaints", {
        FK_passenger: data.FK_passenger,
        FK_status: data.FK_status,
        FK_transport: data.FK_transport,
        transportLine: data.transportLine,
        vehiclePlate: data.vehiclePlate,
        violations: data.violations || [],
        incidentRelation: data.incidentRelation,
        description: data.description,
        image: data.image[0],
        status: data.status ?? true,
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
          Registrar Denuncia
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-3 gap-2 text-zinc-300"
        >
          {/* Pasajero */}
          <label className="flex flex-col gap-1">
            Pasajero *
            <select
              className="input"
              {...register("FK_passenger", { required: "Campo requerido" })}
            >
              <option value="">Seleccione un pasajero</option>
              {passengers.map((p) => (
                <option key={p.PK_passenger} value={p.PK_passenger}>
                  {p.firstName}
                </option>
              ))}
            </select>
            {errors.FK_passenger && (
              <span className="text-sm text-red-500">
                {errors.FK_passenger.message}
              </span>
            )}
          </label>

          {/* Estado de Denuncia */}
          <label className="flex flex-col gap-1">
            Estado de Denuncia *
            <select
              className="input"
              {...register("FK_status", { required: "Campo requerido" })}
            >
              <option value="">Seleccione un estado</option>
              {statuses.map((s) => (
                <option key={s.PK_status} value={s.PK_status}>
                  {s.statusName}
                </option>
              ))}
            </select>
            {errors.FK_status && (
              <span className="text-sm text-red-500">
                {errors.FK_status.message}
              </span>
            )}
          </label>

          {/* Transporte */}
          <label className="flex flex-col gap-1">
            Transporte *
            <select
              className="input"
              {...register("FK_transport")}
            >
              <option value="">Seleccione un transporte</option>
              {transports.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
            {errors.FK_transport && (
              <span className="text-sm text-red-500">
                {errors.FK_transport.message}
              </span>
            )}
          </label>

          {/* Línea de Transporte */}
          <label className="flex flex-col gap-1">
            Línea de Transporte *
            <input
              type="text"
              className="input"
              {...register("transportLine", { required: "Campo requerido" })}
            />
            {errors.transportLine && (
              <span className="text-sm text-red-500">
                {errors.transportLine.message}
              </span>
            )}
          </label>

          {/* Placa del Vehículo */}
          <label className="flex flex-col gap-1">
            Placa del Vehículo *
            <input
              type="text"
              className="input"
              {...register("vehiclePlate", { required: "Campo requerido" })}
            />
            {errors.vehiclePlate && (
              <span className="text-sm text-red-500">
                {errors.vehiclePlate.message}
              </span>
            )}
          </label>

          {/* Infracciones (Checklist) */}
          <fieldset className="flex flex-col gap-1 ">
            <legend className="font-medium">Infracciones *</legend>
            {[
              { id: "1", label: "Incumplimiento de criterios de Calidad" },
              { id: "2", label: "Incumplimiento de criterios de Seguridad" },
              { id: "3", label: "Cobro de tarifas superiores a la Ley" },
              { id: "4", label: "No recoger un pasajero" },
              { id: "5", label: "Abandonar al usuario a medio recorrido" },
            ].map((infraction) => (
              <label key={infraction.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={infraction.label}
                  {...register("violations")}
                  className="checkbox"
                />
                {infraction.label}
              </label>
            ))}
          </fieldset>

          {/* Relación del Incidente (Radio Buttons) */}
          <fieldset className="flex flex-col gap-1 ">
            <legend className="font-medium">Relación del Incidente *</legend>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="Victima"
                {...register("incidentRelation", {
                  required: "Campo requerido",
                })}
                className="radio"
              />
              Víctima
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="Testigo"
                {...register("incidentRelation", {
                  required: "Campo requerido",
                })}
                className="radio"
              />
              Testigo
            </label>
            {errors.incidentRelation && (
              <span className="text-sm text-red-500">
                {errors.incidentRelation.message}
              </span>
            )}
          </fieldset>

          {/* Descripción */}
          <label className="flex flex-col gap-1 md:col-span-2">
            Descripción *
            <textarea
              className="input"
              {...register("description")}
            />
            {errors.description && (
              <span className="text-sm text-red-500">
                {errors.description.message}
              </span>
            )}
          </label>

          {/* Imagen */}
          <label className="flex flex-col gap-1 md:col-span-2">
            Imagen de Evidencia
            <input
              type="file"
              accept="image/*"
              className="input"
              {...register("image")}
            />
          </label>

          {/* Botón de Envío */}
          <section className="md:col-span-3 flex justify-between mt-4 border-t border-zinc-700 pt-4">
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

export default CreateComplaintPage;

"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import SubmitButton from "../buttons/SubmitButton";
import { useAppContext } from "@/context/appContext";

function CardAsistencia({ params, id, name, code, attendance }) {
  const [showOptions, setShowOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setErrorMessage, setSuccessMessage } = useAppContext();

  const FK_activity = params.PK_activity;
  const PK_partner = id;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const watchedStatus = watch("status");

  const cardRef = useRef(null);

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  // Establecer el estado inicial del input con el valor de `attendance`
  useEffect(() => {
    if (attendance) {
      setValue("status", attendance);
    }
  }, [attendance, setValue]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `/api/dashboard/activities/${id}/asistencia`,
        data
      );
      setSuccessMessage(response.data.message);
      setShowOptions(false);
    } catch (error) {
      console.error("Error updating attendance:", error);
      setErrorMessage(error.response?.data?.error || "Ocurrió un error");
    } finally {
      setIsLoading(false);
    }
  };

  // Función para determinar las clases según la opción y si está activa
  const getOptionClasses = (option) => {
    const baseClasses =
      "px-4 py-2 rounded-md border-2 transition-colors duration-300 cursor-pointer";
    const inactiveClasses = "border-gray-400 text-gray-700";
    const activeClasses =
      option === "Presente"
        ? "bg-green-500 border-green-500 text-white"
        : option === "Retraso"
        ? "bg-yellow-500 border-yellow-500 text-white"
        : option === "Falta"
        ? "bg-red-500 border-red-500 text-white"
        : "bg-blue-500 border-blue-500 text-white";
    return `${baseClasses} ${watchedStatus === option ? activeClasses : inactiveClasses}`;
  };

  return (
    <div className="inline-block" ref={cardRef}>
      <button
        className="hover:bg-zinc-200 rounded-md shadow-md p-2"
        onClick={toggleOptions}
      >
        <svg
          className="w-6 h-6 text-current"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>

      {showOptions && (
        <>
          {/* Fondo translúcido */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setShowOptions(false)}
          ></div>

          {/* Modal centrado */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 max-w-full shadow-2xl rounded-md z-50 py-8">
            <h1 className="text-2xl text-black font-medium pb-4 text-center">
              Marcar asistencia
            </h1>
            <h2 className="text-lg font-bold text-center">{code}</h2>
            <p className="font-medium text-center pb-8">{name}</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Estado */}
              <div className="text-lg">
                <div className="grid grid-cols-2 md:flex items-center gap-6">
                  {["Presente", "Retraso", "Falta", "Permiso"].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        value={option}
                        {...register("status", {
                          required: "Estado es requerido",
                        })}
                        className="hidden"
                        defaultChecked={attendance === option}
                      />
                      <span className={getOptionClasses(option)}>
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.status && (
                  <p className="text-sm text-red-500">
                    {errors.status.message}
                  </p>
                )}
              </div>

              {/* Botón de Enviar */}
              <div className="flex text-lg items-center justify-between gap-4 mt-4">
                <button
                  type="button"
                  className="text-black bg-zinc-200 px-4 py-2 rounded-md"
                  onClick={() => setShowOptions(false)}
                >
                  Cancelar
                </button>
                <SubmitButton isLoading={isLoading} name={"Actualizar"} />
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default CardAsistencia;

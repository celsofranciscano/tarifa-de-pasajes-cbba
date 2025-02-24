"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import SubmitButton from "@/components/common/buttons/SubmitButton";
import Link from "next/link";
import { useAppContext } from "@/context/appContext";

function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setErrorMessage, setSuccessMessage } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false, // Evita redirección automática
      });

      if (!response) {
        throw new Error("No se recibió respuesta del servidor.");
      }

      if (response.error) {
        setErrorMessage("Credenciales incorrectos");
        console.log(response.error);
      } else if (response.status === 200) {
        setSuccessMessage("Inicio de sesión exitoso");
        router.replace("/dashboard"); // Evita volver atrás al login
      } else {
        setErrorMessage("Error inesperado. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error en login:", error);
      setErrorMessage(error?.message || "Error desconocido al iniciar sesión.");
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold my-4 text-gold ">
        <span className="text-outline block text-center ">Tarifa</span>
        Inicia Sesión
      </h1>

      <form
        onSubmit={onSubmit}
        className="grid gap-4 md:w-1/2 w-full bg-dark border border-gold/20 card-hover  p-4 md:p-10 rounded-md  "
      >
        <label className="flex flex-col gap-1">
          Correo Electrónico
          <input
            type="email"
            className="input"
            placeholder="Escribe tu correo electrónico"
            autoFocus
            {...register("email", {
              required: "Correo electrónico requerido",
              maxLength: { value: 80, message: "Máximo 80 caracteres" },
            })}
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </label>

        <label className="flex flex-col gap-1">
          Contraseña
          <input
            type="password"
            className="input "
            placeholder="Escribe tu contraseña"
            {...register("password", { required: "Contraseña requerida" })}
          />
          {errors.password && (
            <span className="text-sm text-red-500">
              {errors.password.message}
            </span>
          )}
        </label>

        <input className="py-2 bg-gold mt-8 text-dark font-bold rounded-full hover:bg-gold-light animate-glow text-lg" type="submit" value={"Iniciar Sesion"} />

    
      </form>
    </div>
  );
}

export default LoginPage;

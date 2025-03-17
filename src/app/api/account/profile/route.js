import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// 📌 GET: Obtener pasajero autenticado
export async function GET(request) {
  // Verifica el token en la cabecera
  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json(
      { error: "Token no proporcionado" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1]; // 'Bearer <token>'
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.AUTH_SECRET);
    console.log("Token válido:", decoded);
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return NextResponse.json({ error: "Token inválido" }, { status: 403 });
  }

  try {
    const passenger = await prisma.tbpassenger.findUnique({
      where: { PK_passenger: decoded.id }, // Se obtiene el ID del pasajero desde el token
      include: { tbfares: true }, // Relación con tarifas y denuncias
    });

    if (!passenger) {
      return NextResponse.json(
        { error: "Pasajero no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(passenger);
  } catch (error) {
    console.error("Error al obtener pasajero:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  console.log("Celso en la API - PATCH");

  // Verifica el token en la cabecera
  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json(
      { error: "Token no proporcionado" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1]; // 'Bearer <token>'
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.AUTH_SECRET);
    console.log("Token válido:", decoded);
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return NextResponse.json({ error: "Token inválido" }, { status: 403 });
  }

  try {
    // Desestructuración de los datos del cuerpo de la solicitud
    const { firstName, lastName, phone, birthDate, address, gender } =
      await request.json();

    // Actualiza los datos del pasajero en la base de datos
    const updatedPassenger = await prisma.tbpassenger.update({
      where: { PK_passenger: decoded.id },
      data: {
        firstName,
        lastName,
        phone,
        birthDate,
        address,
        gender,
      },
    });

    return NextResponse.json(updatedPassenger);
  } catch (error) {
    console.error("Error al actualizar pasajero:", error);
    return NextResponse.json(
      { error: "Error al actualizar el pasajero" },
      { status: 500 }
    );
  }
}

import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

// GET UNIQUE - Obtener un pasajero por PK_passenger
export async function GET(req, { params }) {
  const { PK_passenger } = params;
  try {
    // Obtener un pasajero específico por PK_passenger
    const passenger = await prisma.tbpassenger.findUnique({
      where: {
        PK_passenger: parseInt(PK_passenger), // Convertir PK_passenger a entero
      },
      include: {
        fare: true, // Incluir la tarifa asociada al pasajero
      },
    });
    return NextResponse.json(passenger);
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// PATCH - Actualizar un pasajero específico por PK_passenger
export async function PATCH(req, { params }) {
  try {
    const { PK_passenger } = params;
    const data = await req.json(); // Los nuevos datos para actualizar

    // Actualizar el pasajero con los nuevos datos
    await prisma.tbpassenger.update({
      where: { PK_passenger: parseInt(PK_passenger) },
      data,
    });

    return NextResponse.json({
      message: "Pasajero actualizado correctamente",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

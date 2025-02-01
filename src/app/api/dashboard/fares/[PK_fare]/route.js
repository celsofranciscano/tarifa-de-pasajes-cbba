import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

// GET UNIQUE - Obtener una tarifa por PK_fare
export async function GET(req, { params }) {
  const { PK_fare } = params;
  try {
    // Obtener una tarifa específica por PK_fare
    const fare = await prisma.tbfares.findUnique({
      where: {
        PK_fare: parseInt(PK_fare), // Convertir PK_fare a entero
      },
    });
    return NextResponse.json(fare);
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// PATCH - Actualizar una tarifa específica por PK_fare
export async function PATCH(req, { params }) {
  try {
    const { PK_fare } = params;
    const data = await req.json(); // Los nuevos datos para actualizar

    // Actualizar la tarifa con los nuevos datos
    await prisma.tbfares.update({
      where: { PK_fare: parseInt(PK_fare) },
      data,
    });

    return NextResponse.json({
      message: "Tarifa actualizada correctamente",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

// GET ALL - Obtener todas las tarifas
export async function GET() {
  try {
    // Obtener todas las tarifas de la base de datos
    const fares = await prisma.tbfares.findMany();
    return NextResponse.json(fares);
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// POST - Crear una nueva tarifa
export async function POST(request) {
  try {
    // Desestructuración de los datos enviados en el cuerpo de la solicitud
    const { userType, amount, status } = await request.json();

    // Crear la nueva tarifa
    await prisma.tbfares.create({
      data: {
        userType,
        amount,
        status,
      },
    });

    return NextResponse.json({
      message: "Tarifa creada exitosamente",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Hubo un error al crear el recurso en el servidor.",
      },
      {
        status: 500,
      }
    );
  }
}

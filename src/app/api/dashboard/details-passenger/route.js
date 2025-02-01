import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

// POST - Crear detalle de pasajero
export async function POST(request) {
  try {
    const { address, email, FK_passenger } = await request.json();

    // Verificar si el email ya está registrado en otro detalle de pasajero
    const existingDetail = await prisma.tbdetailspassenger.findUnique({
      where: { email },
    });

    if (existingDetail) {
      return NextResponse.json(
        { error: "El correo electrónico ya está asociado a otro pasajero." },
        { status: 400 }
      );
    }

    // Crear el detalle de pasajero
    const newDetail = await prisma.tbdetailspassenger.create({
      data: {
        address,
        email,
        FK_passenger,
      },
    });

    return NextResponse.json({
      message: "Detalle de pasajero creado exitosamente",
      data: newDetail,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Hubo un error al crear el detalle del pasajero." },
      { status: 500 }
    );
  }
}

// GET - Obtener todos los detalles de los pasajeros
export async function GET() {
  try {
    const details = await prisma.tbdetailspassenger.findMany();
    return NextResponse.json(details);
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

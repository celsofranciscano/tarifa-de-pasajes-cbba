import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma"; 

// Obtener una tarifa por ID
export async function GET(req, { params }) {
  try {
    const { PK_fare } = params;
    const fare = await prisma.tbfares.findUnique({
      where: { PK_fare: Number(PK_fare) },
    });

    if (!fare) {
      return NextResponse.json({ error: "Tarifa no encontrada" }, { status: 404 });
    }

    return NextResponse.json(fare);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener tarifa" }, { status: 500 });
  }
}

// Actualizar una tarifa por ID
export async function PUT(req, { params }) {
  try {
    const { PK_fare } = params;
    const { userType, amount, status } = await req.json();

    const updatedFare = await prisma.tbfares.update({
      where: { PK_fare: Number(PK_fare) },
      data: { userType, amount, status },
    });

    return NextResponse.json(updatedFare);
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar tarifa" }, { status: 500 });
  }
}

// Eliminar una tarifa por ID
export async function DELETE(req, { params }) {
  try {
    const { PK_fare } = params;

    await prisma.tbfares.delete({
      where: { PK_fare: Number(PK_fare) },
    });

    return NextResponse.json({ message: "Tarifa eliminada correctamente" });
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar tarifa" }, { status: 500 });
  }
}

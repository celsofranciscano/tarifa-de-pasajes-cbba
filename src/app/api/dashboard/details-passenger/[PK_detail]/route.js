import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

// GET - Obtener detalle de pasajero único por PK_detail
export async function GET(req, { params }) {
  const { PK_detail } = params;
  try {
    const detail = await prisma.tbdetailspassenger.findUnique({
      where: {
        PK_detail: parseInt(PK_detail),
      },
    });

    if (!detail) {
      return NextResponse.json(
        { error: "Detalle del pasajero no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(detail);
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// PATCH - Actualizar detalle de pasajero
export async function PATCH(req, { params }) {
  const { PK_detail } = params;
  try {
    const { address, email, status } = await req.json();

    const updatedDetail = await prisma.tbdetailspassenger.update({
      where: { PK_detail: parseInt(PK_detail) },
      data: {
        address,
        email,
        status,
      },
    });

    return NextResponse.json({
      message: "Detalle de pasajero actualizado exitosamente",
      data: updatedDetail,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Hubo un error al actualizar el detalle del pasajero" },
      { status: 500 }
    );
  }
}

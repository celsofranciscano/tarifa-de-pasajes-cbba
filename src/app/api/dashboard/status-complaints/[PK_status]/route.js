import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

// GET UNIQUE
export async function GET(req, { params }) {
  const { PK_status } = params;
  try {
    const statusComplaint = await prisma.tbstatuscomplaints.findUnique({
      where: {
        PK_status: parseInt(PK_status),
      },
    });

    if (!statusComplaint) {
      return NextResponse.json(
        { error: "Estado de queja no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(statusComplaint);
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// PATCH (Actualizar un estado de queja)
export async function PATCH(req, { params }) {
  try {
    const { PK_status } = params;
    const data = await req.json();

    const updatedStatus = await prisma.tbstatuscomplaints.update({
      where: { PK_status: parseInt(PK_status) },
      data,
    });

    return NextResponse.json(
      { message: "Estado de queja actualizado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error al actualizar el estado de queja" },
      { status: 500 }
    );
  }
}

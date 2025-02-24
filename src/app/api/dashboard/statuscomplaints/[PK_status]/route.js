import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";



// GET UNIQUE tbstatuscomplaints
export async function GET(req, { params }) {
  const { PK_status } = params;
  try {
    const status = await prisma.tbstatuscomplaints.findUnique({
      where: { PK_status: parseInt(PK_status) },
    });
    return NextResponse.json(status);
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// PATCH tbstatuscomplaints
export async function PATCH(req, { params }) {
  try {
    const { PK_status } = params;
    const { statusName, description } = await req.json();
    await prisma.tbstatuscomplaints.update({
      where: { PK_status: parseInt(PK_status) },
      data: {
        statusName,
        description,
      },
    });
    return NextResponse.json({ message: "Estado de denuncia actualizado correctamente" });
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar el estado de denuncia" }, { status: 500 });
  }
}
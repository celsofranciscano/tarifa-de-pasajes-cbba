import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

// GET ALL tbstatuscomplaints
export async function GET() {
  try {
    const statuses = await prisma.tbstatuscomplaints.findMany();
    return NextResponse.json(statuses);
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// POST tbstatuscomplaints
export async function POST(request) {
  try {
    const { statusName, description } = await request.json();
    await prisma.tbstatuscomplaints.create({
      data: {
        statusName,
        description,
      },
    });
    return NextResponse.json({ message: "Estado de denuncia creado exitosamente" });
  } catch (error) {
    return NextResponse.json({ error: "Error al crear el estado de denuncia" }, { status: 500 });
  }
}

import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

// GET ALL
export async function GET() {
  try {
    const statusComplaints = await prisma.tbstatuscomplaints.findMany();
    return NextResponse.json(statusComplaints);
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// POST (Crear un nuevo estado de queja)
export async function POST(request) {
  try {
    const { statusName, description } = await request.json();

    // Crear el nuevo estado de queja
    await prisma.tbstatuscomplaints.create({
      data: {
        statusName,
        description,
      },
    });

    return NextResponse.json(
      { message: "Estado de queja creado exitosamente" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear el estado de queja" },
      { status: 500 }
    );
  }
}

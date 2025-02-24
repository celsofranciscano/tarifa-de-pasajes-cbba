import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

// GET ALL (Obtener todos los privilegios)
export async function GET() {
  try {
    const privileges = await prisma.tbprivileges.findMany();
    return NextResponse.json(privileges);
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// POST (Crear un nuevo privilegio)
export async function POST(request) {
  try {
    const { privilege } = await request.json();
    
    await prisma.tbprivileges.create({
      data: {
        privilege,
   
      },
    });

    return NextResponse.json({ message: "Privilegio creado exitosamente" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Hubo un error al crear el privilegio." },
      { status: 500 }
    );
  }
}


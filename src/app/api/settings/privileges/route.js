import prisma from "@/lib/db/prisma"; // Importar Prisma
import { NextResponse } from "next/server"; // Importar NextResponse para respuestas HTTP

// Método GET: Obtener todos los privilegios
export async function GET() {
  try {
    const privileges = await prisma.tbprivileges.findMany();

    // Transformar datos para mejorar el formato de respuesta
    const renamedPrivileges = privileges.map((privilege) => ({
      ID: privilege.PK_privilege,
      Name: privilege.privilege,
      Status: privilege.status ? "Active" : "Inactive",
      CreatedAt: new Date(privilege.createdAt).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    }));

    return NextResponse.json(renamedPrivileges); // Responder con datos formateados
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Método POST: Crear un nuevo privilegio
export async function POST(request) {
  try {
    const { privilege } = await request.json();

    // Validar si el privilegio ya existe
    const existingPrivilege = await prisma.tbprivileges.findUnique({
      where: { privilege },
    });

    if (existingPrivilege) {
      return NextResponse.json(
        { error: "Privilege already exists" },
        { status: 400 }
      );
    }

    // Crear el nuevo privilegio
    const newPrivilege = await prisma.tbprivileges.create({
      data: {
        privilege,
        status: true,
      },
    });

    return NextResponse.json({
      message: "Privilege created successfully",
      status: 201,
      data: newPrivilege,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creating privilege" },
      { status: 500 }
    );
  }
}

import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

// GET UNIQUE (Obtener un privilegio por ID)
export async function GET(request, { params }) {
  try {
    const privilege = await prisma.tbprivileges.findUnique({
      where: { PK_privilege: Number(params.PK_privilege) },
    });

    if (!privilege) {
      return NextResponse.json(
        { error: "Privilegio no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(privilege);
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// PATCH (Actualizar un privilegio por ID)
export async function PATCH(request, { params }) {
  try {
    const { privilege, status } = await request.json();

    const updatedPrivilege = await prisma.tbprivileges.update({
      where: { PK_privilege: Number(params.PK_privilege) },
      data: {
        privilege,
        status,
        updatedAt: new Date().toISOString(),
      },
    });

    return NextResponse.json(updatedPrivilege);
  } catch (error) {
    return NextResponse.json(
      { error: "Hubo un error al actualizar el privilegio." },
      { status: 500 }
    );
  }
}

import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

// Método GET: Obtener un usuario por ID
export async function GET(request, { params }) {
  const { PK_user } = params;

  try {
    const user = await prisma.tbusers.findUnique({
      where: { PK_user: Number(PK_user) },
      include: { privilege: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener el usuario" },
      { status: 500 }
    );
  }
}

// Método PATCH: Actualizar usuario parcialmente
export async function PATCH(request, { params }) {
  const { PK_user } = params;
  const updates = await request.json();

  try {
    const updatedUser = await prisma.tbusers.update({
      where: { PK_user: Number(PK_user) },
      data: updates,
    });

    return NextResponse.json({
      message: "Usuario actualizado exitosamente",
      data: updatedUser,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al actualizar el usuario" },
      { status: 500 }
    );
  }
}

// Método DELETE: Eliminar usuario
export async function DELETE(request, { params }) {
  const { PK_user } = params;

  try {
    await prisma.tbusers.delete({
      where: { PK_user: Number(PK_user) },
    });

    return NextResponse.json({
      message: "Usuario eliminado exitosamente",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al eliminar el usuario" },
      { status: 500 }
    );
  }
}

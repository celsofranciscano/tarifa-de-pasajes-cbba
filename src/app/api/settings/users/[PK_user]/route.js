import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

// GET UNIQUE (Obtener un usuario por ID)
export async function GET(request, { params }) {
  try {
    const user = await prisma.tbusers.findUnique({
      where: { PK_user: Number(params.PK_user) },
      include: { tbprivileges: true },
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
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// PATCH (Actualizar un usuario por ID)
export async function PATCH(request, { params }) {
  try {
    const { firstName, lastName, phoneNumber, email, status ,FK_privilege } = await request.json();

    const updatedUser = await prisma.tbusers.update({
      where: { PK_user: Number(params.PK_user) },
      data: {
        firstName,
        lastName,
        phoneNumber,
        email,
        status,
        FK_privilege:Number(FK_privilege),
        updatedAt: new Date().toISOString(),
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Hubo un error al actualizar el usuario." },
      { status: 500 }
    );
  }
}

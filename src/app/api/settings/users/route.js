import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

// GET ALL (Obtener todos los usuarios)
export async function GET() {
  try {
    const users = await prisma.tbusers.findMany({
      include: { tbprivileges: true },
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// POST (Crear un nuevo usuario)
export async function POST(request) {
  try {
    const { firstName, lastName, phoneNumber, email, password, FK_privilege } =
      await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.tbusers.create({
      data: {
        firstName,
        lastName,
        phoneNumber,
        email,
        password:hashedPassword,
        FK_privilege,
      },
    });

    return NextResponse.json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Hubo un error al crear el usuario." },
      { status: 500 }
    );
  }
}

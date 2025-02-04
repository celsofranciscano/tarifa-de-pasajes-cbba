import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

// Método GET: Obtener todos los usuarios
export async function GET() {
  try {
    const users = await prisma.tbusers.findMany({
      include: {
        privilege: true, // Obtener datos de la relación con privilegios
      },
    });

    const renamedUsers = users.map((user) => ({
      ID: user.PK_user,
      Nombre: user.firstName,
      Apellido: user.lastName,
      Telefono: user.phoneNumber || "No disponible",
      Email: user.email,
      Estado: user.status ? "Activo" : "Inactivo",
      Privilegio: user.privilege ? user.privilege.privilege : "No asignado",
      ÚltimoLogin: user.lastLogin
        ? new Date(user.lastLogin).toLocaleString("es-ES")
        : "No disponible",
      Registro: new Date(user.createdAt).toLocaleDateString("es-ES"),
    }));

    return NextResponse.json(renamedUsers);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener los usuarios" },
      { status: 500 }
    );
  }
}

// Método POST: Crear un nuevo usuario
export async function POST(request) {
  try {
    const { firstName, lastName, phoneNumber, email, password, FK_privilege } =
      await request.json();

    // Validar si el email ya existe
    const existingUser = await prisma.tbusers.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "El correo ya está registrado" },
        { status: 400 }
      );
    }

    // Crear usuario
    const newUser = await prisma.tbusers.create({
      data: {
        firstName,
        lastName,
        phoneNumber,
        email,
        password, // ⚠️ Importante: Se debe encriptar antes en un futuro
        FK_privilege,
        status: true,
      },
    });

    return NextResponse.json({
      message: "Usuario creado exitosamente",
      status: 201,
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al crear el usuario" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/db/prisma";

export async function POST(request) {

  try {
    const { firstName, lastName, email, password,FK_fare } = await request.json();
    const emailFound = await prisma.tbpassenger.findUnique({
      where: {
        email: email,
      },
    });
    if (emailFound) {
      return NextResponse.json(
        {
          error: "Ya existe una cuenta puedes iniciar sesion",
        },
        {
          status: 400,
        }
      );
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.tbpassenger.create({
      data: {
        FK_fare: Number(FK_fare),
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });


    return NextResponse.json({
      message: "Usuario creado exitosamente",
      newUser,
    });
  } catch (error) {

    console.log(error)
 
    return NextResponse.json(
      {
        error: "Hubo un error al crear el recurso en el servidor.",
      },
      {
        status: 500,
      }
    );
  }
}

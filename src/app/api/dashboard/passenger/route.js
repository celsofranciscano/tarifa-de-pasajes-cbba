import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

// GET ALL tbpassenger
export async function GET() {
  try {
    const passengers = await prisma.tbpassenger.findMany();
    return NextResponse.json(passengers);
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// POST tbpassenger
export async function POST(request) {
  try {
    const { FK_fare, firstName, lastName, email, password } = await request.json();
    await prisma.tbpassenger.create({
      data: {
        FK_fare: Number(FK_fare),
        firstName,
        lastName,
        email,
        password,
      },
    });
    return NextResponse.json({ message: "Pasajero creado exitosamente" });
  } catch (error) {
    return NextResponse.json({ error: "Error al crear el pasajero" }, { status: 500 });
  }
}

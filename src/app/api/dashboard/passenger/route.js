import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

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
    const { FK_fare, firstName, lastName, email, password, CI, phone, profileImage, birthDate, address, gender, infracciones, status } = await request.json();
    await prisma.tbpassenger.create({
      data: {
        FK_fare: Number(FK_fare),
        firstName,
        lastName,
        email,
        password,
        CI,
        phone,
        profileImage,
        birthDate: new Date(birthDate),
        address,
        gender,
        infracciones: infracciones ? Number(infracciones) : null,
        status: Boolean(status),
      },
    });
    return NextResponse.json({ message: "Pasajero creado exitosamente" });
  } catch (error) {
    return NextResponse.json({ error: "Error al crear el pasajero" }, { status: 500 });
  }
}

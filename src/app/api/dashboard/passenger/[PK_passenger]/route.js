import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";



// GET UNIQUE tbpassenger
export async function GET(req, { params }) {
  const { PK_passenger } = params;
  try {
    const passenger = await prisma.tbpassenger.findUnique({
      where: { PK_passenger: parseInt(PK_passenger) },
    });
    return NextResponse.json(passenger);
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// PATCH tbpassenger
export async function PATCH(req, { params }) {
  try {
    const { PK_passenger } = params;
    const { FK_fare, firstName, lastName, email, password, CI, phone, profileImage, birthDate, address, gender, infracciones, status } = await req.json();
    await prisma.tbpassenger.update({
      where: { PK_passenger: parseInt(PK_passenger) },
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
    return NextResponse.json({ message: "Pasajero actualizado correctamente" });
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar el pasajero" }, { status: 500 });
  }
}

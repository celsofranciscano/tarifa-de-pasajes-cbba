import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma"; // Importar Prisma

// Obtener todos los pasajeros
export async function GET() {
  try {
    const passengers = await prisma.tbpassenger.findMany({
      include: {
        fare: true, // Incluir la relación de fare si es necesario
        details: true, // Incluir la relación de details si es necesario
        complaints: true, // Incluir la relación de complaints si es necesario
      },
    });

    return NextResponse.json(passengers);
  } catch (error) {
    console.error("❌ Error en GET /passenger:", error); // Mejora en la depuración
    return NextResponse.json({ error: "Error al obtener pasajeros" }, { status: 500 });
  }
}

// Crear un nuevo pasajero
export async function POST(req) {
  try {
    const { firstName, lastName, CI, phone, birthDate, gender, fareId, profileImage } = await req.json();

    if (!firstName || !lastName || !CI || !birthDate || !gender || !fareId) {
      return NextResponse.json({ error: "Faltan datos requeridos" }, { status: 400 });
    }

    // Verificar si ya existe un pasajero con el CI proporcionado
    const existingPassenger = await prisma.tbpassenger.findUnique({
      where: { CI },
    });

    if (existingPassenger) {
      return NextResponse.json({ error: "Ya existe un pasajero con ese CI" }, { status: 400 });
    }

    const newPassenger = await prisma.tbpassenger.create({
      data: {
        firstName,
        lastName,
        CI,
        phone,
        birthDate: new Date(birthDate),
        gender,
        FK_fare: fareId,
        profileImage: profileImage || null, // Si no se proporciona, se asigna null
      },
    });

    return NextResponse.json(newPassenger, { status: 201 });
  } catch (error) {
    console.error("❌ Error en POST /passenger:", error); // Mejora en la depuración
    return NextResponse.json({ error: "Error al crear pasajero" }, { status: 500 });
  }
}

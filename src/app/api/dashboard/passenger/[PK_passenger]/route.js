import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma"; // Importar Prisma

// Obtener un pasajero por su PK (ID)
export async function GET(req, { params }) {
  const { PK_passenger } = params; // Obtenemos el parámetro PK_passenger de la URL

  if (!PK_passenger) {
    return NextResponse.json({ error: "PK_passenger no proporcionado" }, { status: 400 });
  }

  try {
    const passenger = await prisma.tbpassenger.findUnique({
      where: { PK_passenger: parseInt(PK_passenger) },
      include: {
        fare: true, // Incluir la relación de fare si es necesario
        details: true, // Incluir la relación de details si es necesario
        complaints: true, // Incluir la relación de complaints si es necesario
      },
    });

    if (!passenger) {
      return NextResponse.json({ error: "Pasajero no encontrado" }, { status: 404 });
    }

    return NextResponse.json(passenger);
  } catch (error) {
    console.error("❌ Error en GET /passenger/[PK_passenger]:", error); // Mejora en la depuración
    return NextResponse.json({ error: "Error al obtener los detalles del pasajero" }, { status: 500 });
  }
}

// Actualizar un pasajero
export async function PUT(req, { params }) {
  const { PK_passenger } = params; // Obtenemos el parámetro PK_passenger de la URL

  if (!PK_passenger) {
    return NextResponse.json({ error: "PK_passenger no proporcionado" }, { status: 400 });
  }

  try {
    const { firstName, lastName, phone, birthDate, gender, profileImage, status } = await req.json();

    // Validar que los datos requeridos estén presentes
    if (!firstName || !lastName || !birthDate || !gender) {
      return NextResponse.json({ error: "Faltan datos requeridos" }, { status: 400 });
    }

    // Actualizar el pasajero
    const updatedPassenger = await prisma.tbpassenger.update({
      where: { PK_passenger: parseInt(PK_passenger) },
      data: {
        firstName,
        lastName,
        phone,
        birthDate: new Date(birthDate),
        gender,
        profileImage: profileImage || null,
        status: status !== undefined ? status : true, // Si no se proporciona status, se mantiene como true por defecto
      },
    });

    return NextResponse.json(updatedPassenger);
  } catch (error) {
    console.error("❌ Error en PUT /passenger/[PK_passenger]:", error); // Mejora en la depuración
    return NextResponse.json({ error: "Error al actualizar el pasajero" }, { status: 500 });
  }
}

// Eliminar un pasajero
export async function DELETE(req, { params }) {
  const { PK_passenger } = params; // Obtenemos el parámetro PK_passenger de la URL

  if (!PK_passenger) {
    return NextResponse.json({ error: "PK_passenger no proporcionado" }, { status: 400 });
  }

  try {
    // Eliminar el pasajero
    const deletedPassenger = await prisma.tbpassenger.delete({
      where: { PK_passenger: parseInt(PK_passenger) },
    });

    return NextResponse.json(deletedPassenger);
  } catch (error) {
    console.error("❌ Error en DELETE /passenger/[PK_passenger]:", error); // Mejora en la depuración
    return NextResponse.json({ error: "Error al eliminar el pasajero" }, { status: 500 });
  }
}

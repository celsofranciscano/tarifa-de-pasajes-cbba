import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

// GET ALL - Obtener todos los pasajeros
export async function GET() {
  try {
    // Obtener todos los pasajeros con la relación con la tarifa (fare)
    const passengers = await prisma.tbpassenger.findMany({
      include: {
        fare: true, // Incluir la tarifa asociada a cada pasajero
      },
    });
    return NextResponse.json(passengers);
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// POST - Crear un nuevo pasajero
export async function POST(request) {
    try {
      const { FK_fare, firstName, lastName, profileImage, CI, phone, birthDate, gender, infracciones, status } = await request.json();
  
      // Validación de datos
      if (!FK_fare || !firstName || !lastName || !CI || !birthDate || !gender) {
        return NextResponse.json(
          { error: "Faltan campos requeridos." },
          { status: 400 }
        );
      }
  
      // Verificar si el CI ya existe en la base de datos
      const existingPassenger = await prisma.tbpassenger.findUnique({
        where: {
          CI: CI,
        },
      });
  
      if (existingPassenger) {
        return NextResponse.json(
          { error: "El CI ya está registrado en la base de datos." },
          { status: 400 }
        );
      }
  
      // Crear un nuevo pasajero
      await prisma.tbpassenger.create({
        data: {
          FK_fare,
          firstName,
          lastName,
          profileImage,
          CI,
          phone,
          birthDate,
          gender,
          infracciones,
          status,
        },
      });
  
      return NextResponse.json({
        message: "Pasajero creado exitosamente",
      });
    } catch (error) {
      console.error("Error al crear el pasajero: ", error);
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
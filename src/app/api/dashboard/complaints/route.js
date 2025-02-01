import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

// GET - Obtener todas las quejas de los pasajeros
export async function GET() {
    try {
      const complaints = await prisma.tbcomplaints.findMany();
      return NextResponse.json(complaints);
    } catch (error) {
      return NextResponse.json(
        { error: "Error interno del servidor" },
        { status: 500 }
      );
    }
  }
  
// POST - Crear queja de pasajero
export async function POST(request) {
  try {
    const {
      FK_passenger,
      FK_status,
      transportLine,
      vehiclePlate,
      incidentRelation,
      description,
      correctAmount,
      chargedAmount,
      image,
    } = await request.json();

    // Verificar si la queja ya está registrada para ese pasajero
    const existingComplaint = await prisma.tbcomplaints.findFirst({
      where: {
        FK_passenger,
        status: true, // Solo quejas activas
      },
    });

    if (existingComplaint) {
      return NextResponse.json(
        { error: "Este pasajero ya tiene una queja activa." },
        { status: 400 }
      );
    }

    // Crear nueva queja
    const newComplaint = await prisma.tbcomplaints.create({
      data: {
        FK_passenger,
        FK_status,
        transportLine,
        vehiclePlate,
        incidentRelation,
        description,
        correctAmount,
        chargedAmount,
        image,
      },
    });

    return NextResponse.json({
      message: "Queja registrada exitosamente",
      data: newComplaint,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Hubo un error al registrar la queja." },
      { status: 500 }
    );
  }
}


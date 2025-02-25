import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

// GET ALL tbcomplaints
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

// POST tbcomplaints
export async function POST(request) {
  try {
    const {
      FK_passenger,
      FK_status,
      transportLine,
      vehiclePlate,
      violations,
      incidentRelation,
      description,
      image
    } = await request.json();
    await prisma.tbcomplaints.create({
      data: {
        FK_passenger: Number(FK_passenger),
        FK_status:Number(FK_status),
        transportLine,
        vehiclePlate,
        violations :JSON.stringify(violations),
        incidentRelation,
        description,
        image,
      },
    });
    return NextResponse.json({ message: "Denuncia creada exitosamente" });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Error al crear la denuncia" },
      { status: 500 }
    );
  }
}

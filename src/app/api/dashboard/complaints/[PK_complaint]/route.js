import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

// GET - Obtener queja única por PK_complaint
export async function GET(req, { params }) {
  const { PK_complaint } = params;
  try {
    const complaint = await prisma.tbcomplaints.findUnique({
      where: {
        PK_complaint: parseInt(PK_complaint),
      },
    });

    if (!complaint) {
      return NextResponse.json(
        { error: "Queja no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(complaint);
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// PATCH - Actualizar queja
export async function PATCH(req, { params }) {
  const { PK_complaint } = params;
  try {
    const {
      FK_status,
      transportLine,
      vehiclePlate,
      incidentRelation,
      description,
      correctAmount,
      chargedAmount,
      image,
      status,
    } = await req.json();

    const updatedComplaint = await prisma.tbcomplaints.update({
      where: { PK_complaint: parseInt(PK_complaint) },
      data: {
        FK_status,
        transportLine,
        vehiclePlate,
        incidentRelation,
        description,
        correctAmount,
        chargedAmount,
        image,
        status,
      },
    });

    return NextResponse.json({
      message: "Queja actualizada exitosamente",
      data: updatedComplaint,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Hubo un error al actualizar la queja." },
      { status: 500 }
    );
  }
}

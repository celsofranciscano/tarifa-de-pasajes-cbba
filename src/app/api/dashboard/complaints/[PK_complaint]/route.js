import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";


// GET UNIQUE tbcomplaints
export async function GET(req, { params }) {
  const { PK_complaint } = params;
  try {
    const complaint = await prisma.tbcomplaints.findUnique({
      where: { PK_complaint: parseInt(PK_complaint) },
    });
    return NextResponse.json(complaint);
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// PATCH tbcomplaints
export async function PATCH(req, { params }) {
  try {
    const { PK_complaint } = params;
    const { FK_passenger, FK_status, FK_transport, transportLine, vehiclePlate, violations, incidentRelation, description, image, status } = await req.json();
    await prisma.tbcomplaints.update({
      where: { PK_complaint: parseInt(PK_complaint) },
      data: {
        FK_passenger,
        FK_status,
        FK_transport,
        transportLine,
        vehiclePlate,
        violations,
        incidentRelation,
        description,
        image,
        status,
      },
    });
    return NextResponse.json({ message: "Denuncia actualizada correctamente" });
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar la denuncia" }, { status: 500 });
  }
}

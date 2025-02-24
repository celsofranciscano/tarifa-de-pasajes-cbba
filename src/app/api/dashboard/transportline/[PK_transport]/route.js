import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";


// GET UNIQUE tbtransportline
export async function GET(req, { params }) {
  const { PK_transport } = params;
  try {
    const transportLine = await prisma.tbtransportline.findUnique({
      where: { PK_transport: parseInt(PK_transport) },
    });
    return NextResponse.json(transportLine);
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// PATCH tbtransportline
export async function PATCH(req, { params }) {
  try {
    const { PK_transport } = params;
    const { name, route, association, representative, contactNumber, startLocation, endLocation, description, status } = await req.json();
    await prisma.tbtransportline.update({
      where: { PK_transport: parseInt(PK_transport) },
      data: {
        name,
        route,
        association,
        representative,
        contactNumber,
        startLocation,
        endLocation,
        description,
        status,
      },
    });
    return NextResponse.json({ message: "Línea de transporte actualizada correctamente" });
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar la línea de transporte" }, { status: 500 });
  }
}

import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

// GET ALL tbtransportline
export async function GET() {
  try {
    const transportLines = await prisma.tbtransportline.findMany();
    return NextResponse.json(transportLines);
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// POST tbtransportline
export async function POST(request) {
  try {
    const { name, route, association, representative, contactNumber, startLocation, endLocation, description } = await request.json();
    await prisma.tbtransportline.create({
      data: {
        name,
        route,
        association,
        representative,
        contactNumber,
        startLocation,
        endLocation,
        description,
      },
    });
    return NextResponse.json({ message: "Línea de transporte creada exitosamente" });
  } catch (error) {
    return NextResponse.json({ error: "Error al crear la línea de transporte" }, { status: 500 });
  }
}

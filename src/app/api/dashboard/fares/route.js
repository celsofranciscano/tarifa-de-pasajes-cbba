import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

// GET ALL tbfares
export async function GET() {
  try {
    const fares = await prisma.tbfares.findMany();
    return NextResponse.json(fares);
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// POST tbfares
export async function POST(request) {
  try {
    const { userType, amount } = await request.json();
    await prisma.tbfares.create({
      data: {
        userType,
        amount: Number(amount)
      },
    });
    return NextResponse.json({ message: "Tarifa creada exitosamente" });
  } catch (error) {
    return NextResponse.json({ error: "Error al crear la tarifa" }, { status: 500 });
  }
}

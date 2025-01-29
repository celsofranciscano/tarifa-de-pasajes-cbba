import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma"; // Importar Prisma


export async function GET() {
  try {
    const fares = await prisma.tbfares.findMany();
    return NextResponse.json(fares);
  } catch (error) {
    console.error("❌ Error en GET /fares:", error); // 👈 Agregado para depuración
    return NextResponse.json({ error: "Error al obtener tarifas" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { userType, amount } = await req.json();

    if (!userType || !amount) {
      return NextResponse.json({ error: "Faltan datos requeridos" }, { status: 400 });
    }

    const newFare = await prisma.tbfares.create({
      data: { userType, amount },
    });

    return NextResponse.json(newFare, { status: 201 });
  } catch (error) {
    console.error("❌ Error en POST /fares:", error); // 👈 Agregado para depuración
    return NextResponse.json({ error: "Error al crear tarifa" }, { status: 500 });
  }
}

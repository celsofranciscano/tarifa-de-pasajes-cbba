import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";


// GET UNIQUE tbfares
export async function GET(req, { params }) {
  const { PK_fare } = params;
  try {
    const fare = await prisma.tbfares.findUnique({
      where: { PK_fare: parseInt(PK_fare) },
    });
    return NextResponse.json(fare);
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// PATCH tbfares
export async function PATCH(req, { params }) {
  try {
    const { PK_fare } = params;
    const { userType, amount, status } = await req.json();
    await prisma.tbfares.update({
      where: { PK_fare: parseInt(PK_fare) },
      data: {
        userType,
        amount: Number(amount),
        status: Boolean(status),
      },
    });
    return NextResponse.json({ message: "Tarifa actualizada correctamente" });
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar la tarifa" }, { status: 500 });
  }
}

import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  console.log("Se hizo una petición POST");

  // Verifica el token en la cabecera
  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json(
      { error: "Token no proporcionado" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1]; // 'Bearer <token>'
let decoded
  try {
    // Verifica el token
    decoded = jwt.verify(token, process.env.AUTH_SECRET);

    // Si el token es válido, continúa con la creación
    console.log("Token válido:", decoded);
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return NextResponse.json({ error: "Token inválido" }, { status: 403 });
  }

  try {
    const {
      transportLine,
      vehiclePlate,
      violations,
      incidentRelation,
      description,
    } = await request.json();

    await prisma.tbcomplaints.create({
      data: {
        FK_passenger: decoded.id,
        FK_status: 1,
        transportLine,
        vehiclePlate,
        violations: JSON.stringify(violations),
        incidentRelation,
        description,
      },
    });

    return NextResponse.json({ message: "Denuncia creada exitosamente" });
  } catch (error) {
    console.error("Error al crear la denuncia:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

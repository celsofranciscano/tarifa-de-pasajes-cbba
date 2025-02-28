import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request) {
  // Verifica el token en la cabecera
  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json(
      { error: "Token no proporcionado" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1]; // 'Bearer <token>'
  let decoded;
  try {
    // Verifica el token
    decoded = jwt.verify(token, process.env.AUTH_SECRET);
  } catch (error) {
    return NextResponse.json({ error: "Token inválido" }, { status: 403 });
  }

  try {
    // Obtiene solo los anuncios activos
    const adds = await prisma.tbadds.findMany({
      where: {
        status: true, // Filtra los anuncios activos
      },
      orderBy: {
        PK_add: "desc", // Ordena por PK_add en orden descendente
      },
    });

    return NextResponse.json(adds);
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

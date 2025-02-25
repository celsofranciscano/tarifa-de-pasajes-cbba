import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";
import jwt, { decode } from "jsonwebtoken";

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
    const complaints = await prisma.tbcomplaints.findMany({
      where: {
        FK_passenger: decoded.id,
      },
      include: {
        tbstatuscomplaints: {
          select: {
            statusName: true,
            description: true,
          },
        },
        tbtransportline: {
          select: {
            name: true,
            route: true,
          },
        },
      },
      orderBy: {
        PK_complaint: "desc",
      },
    });

    return NextResponse.json(complaints);
  } catch (error) {
 
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

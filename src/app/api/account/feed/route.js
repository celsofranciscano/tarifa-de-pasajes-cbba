import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request) {
  // Verifica el token en la cabecera
  const authHeader = request.headers.get("authorization");
  console.log("aquiii  ahora celso");
  if (!authHeader) {
    return NextResponse.json(
      { error: "Token no proporcionado" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1]; // 'Bearer <token>'

  try {
    // Verifica el token
    const decoded = jwt.verify(token, process.env.AUTH_SECRET);
  } catch (error) {
    return NextResponse.json({ error: "Token inválido" }, { status: 403 });
  }

  try {
    const complaints = await prisma.tbcomplaints.findMany({
  where: {
  tbstatuscomplaints: {
    isNot: { statusName: "Pendiente" },
  },
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

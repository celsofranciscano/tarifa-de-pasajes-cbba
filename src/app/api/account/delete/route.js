import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// DELETE: Eliminar los datos del pasajero autenticado
export async function DELETE(request) {


  // Verificar el token de autorización
  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ error: "Token no proporcionado" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1]; // 'Bearer <token>'
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.AUTH_SECRET);
 
  } catch (error) {
 
    return NextResponse.json({ error: "Token inválido" }, { status: 403 });
  }

  const passengerId = decoded.id;

  try {
    // Usamos una transacción para eliminar datos relacionados y luego al pasajero
    await prisma.$transaction([
      // Eliminamos las denuncias hechas por el pasajero
      prisma.tbcomplaints.deleteMany({
        where: { FK_passenger: passengerId },
      }),
      // Eliminamos las notificaciones del pasajero
      prisma.tbnotifications.deleteMany({
        where: { FK_passenger: passengerId },
      }),
      // Finalmente eliminamos el registro del pasajero
      prisma.tbpassenger.delete({
        where: { PK_passenger: passengerId },
      }),
    ]);

    return NextResponse.json({ message: "Datos del pasajero eliminados correctamente" });
  } catch (error) {
  
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

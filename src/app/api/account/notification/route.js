import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// 📌 GET: Obtener las notificaciones del pasajero autenticado
export async function GET(request) {
  console.log("Celso en la API - GET Notificaciones");

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
    decoded = jwt.verify(token, process.env.AUTH_SECRET);
    console.log("Token válido:", decoded);
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return NextResponse.json({ error: "Token inválido" }, { status: 403 });
  }

  try {
    // Obtener todas las notificaciones para el pasajero autenticado
    const notifications = await prisma.tbnotifications.findMany({
      where: { FK_passenger: decoded.id }, // Filtrar por el ID del pasajero
    });

    if (!notifications) {
      return NextResponse.json(
        { error: "No se encontraron notificaciones" },
        { status: 404 }
      );
    }

    return NextResponse.json(notifications);
  } catch (error) {
    console.error("Error al obtener las notificaciones:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// 📌 PATCH: Actualizar la notificación para marcarla como leída (isRead)
export async function PATCH(request) {
  console.log("Celso en la API - PATCH Notificación");

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
    decoded = jwt.verify(token, process.env.AUTH_SECRET);
    console.log("Token válido:", decoded);
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return NextResponse.json({ error: "Token inválido" }, { status: 403 });
  }

  try {
    // Obtener los datos del cuerpo de la solicitud
    const { notificationId, isRead } = await request.json();

    // Actualizar la notificación con el ID proporcionado
    const updatedNotification = await prisma.tbnotifications.update({
      where: { PK_notification: Number(notificationId) }, // Filtrar por ID de la notificación
      data: {
        isRead: Boolean(isRead), // Actualizar el estado de leída
        updatedAt: new Date(), // Fecha de actualización
      },
    });

    function getBoliviaLocalISOString() {
      const timeZone = "America/La_Paz";
      const options = {
        timeZone,
        hour12: false,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };

      const formatter = new Intl.DateTimeFormat("en-GB", options);
      const parts = formatter.formatToParts(new Date());

      const dateParts = {};
      parts.forEach(({ type, value }) => {
        if (type !== "literal") {
          dateParts[type] = value;
        }
      });

      // Construye la cadena en formato ISO pero con la hora local (sin "Z")
      return `${dateParts.year}-${dateParts.month}-${dateParts.day}T${dateParts.hour}:${dateParts.minute}:${dateParts.second}`;
    }

    console.log(
      "Fecha y hora actual en Bolivia (ISO local):",
      getBoliviaLocalISOString()
    );

    return NextResponse.json(updatedNotification);
  } catch (error) {
    console.error("Error al actualizar la notificación:", error);
    return NextResponse.json(
      { error: "Error al actualizar la notificación" },
      { status: 500 }
    );
  }
}

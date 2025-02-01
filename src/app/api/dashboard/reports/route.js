import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

/**
 * Función para validar las fechas.
 * @param {string} date Fecha en formato YYYY-MM-DD.
 * @returns {Date | null} Objeto Date si es válida, o null si es inválida.
 */
const validateDate = (date) => {
  const parsedDate = new Date(date);
  return parsedDate instanceof Date && !isNaN(parsedDate) ? parsedDate : null;
};

/**
 * Obtener número de usuarios registrados entre un rango de fechas.
 * @param {Date} fromDate Fecha de inicio del rango.
 * @param {Date} toDate Fecha de fin del rango.
 * @returns {Promise<number>} Número de usuarios registrados.
 */
const getUsersRegistered = async (fromDate, toDate) => {
  return await prisma.tbusers.count({
    where: {
      createdAt: {
        gte: fromDate,
        lte: toDate,
      },
    },
  });
};

/**
 * Obtener el número de denuncias agrupadas por estado.
 * @returns {Promise<Array>} Número de denuncias agrupadas por estado.
 */
const getComplaintsByStatus = async () => {
  return await prisma.tbcomplaints.groupBy({
    by: ["FK_status"],
    _count: {
      PK_complaint: true,
    },
  });
};

/**
 * Obtener número de pasajeros registrados por tipo de tarifa.
 * @returns {Promise<Array>} Número de pasajeros agrupados por tipo de tarifa.
 */
const getPassengersByFare = async () => {
  return await prisma.tbfares.findMany({
    select: {
      userType: true,
      _count: {
        passengers: true,
      },
    },
  });
};

/**
 * Obtener número de denuncias agrupadas por tipo de transporte.
 * @returns {Promise<Array>} Número de denuncias agrupadas por tipo de transporte.
 */
const getComplaintsByTransportLine = async () => {
  return await prisma.tbcomplaints.groupBy({
    by: ["transportLine"],
    _count: {
      PK_complaint: true,
    },
  });
};

/**
 * Ruta para obtener los reportes de los usuarios y denuncias.
 * @param {Request} request Objeto de la solicitud.
 * @returns {NextResponse} Respuesta con los reportes solicitados.
 */
export async function GET(request) {
  try {
    // Obtener los parámetros de la URL
    const url = new URL(request.url);
    const fromDateParam = url.searchParams.get("fromDate");
    const toDateParam = url.searchParams.get("toDate");

    // Validación de las fechas
    if (!fromDateParam || !toDateParam) {
      return NextResponse.json({ error: "Faltan parámetros de fechas" }, { status: 400 });
    }

    const fromDate = validateDate(fromDateParam);
    const toDate = validateDate(toDateParam);

    if (!fromDate || !toDate) {
      return NextResponse.json({ error: "Fechas inválidas" }, { status: 400 });
    }

    // Obtener los datos
    const usersRegistered = await getUsersRegistered(fromDate, toDate);
    const complaintsByStatus = await getComplaintsByStatus();
    const passengersByFare = await getPassengersByFare();
    const complaintsByTransportLine = await getComplaintsByTransportLine();

    // Respuesta con los datos
    return NextResponse.json({
      usersRegistered,
      complaintsByStatus,
      passengersByFare,
      complaintsByTransportLine,
    });
  } catch (error) {
    console.error("Error al obtener reportes:", error);
    return NextResponse.json({ error: "Error al obtener reportes" }, { status: 500 });
  }
}

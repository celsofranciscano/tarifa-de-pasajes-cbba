import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/db/prisma";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.AUTH_SECRET; 

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Buscar usuario en la base de datos
    const user = await prisma.tbpassenger.findUnique({
      where: { email },
      include: { tbfares: true }, // Incluir tarifas asociadas
    });
   

    if (!user) {
      return NextResponse.json({ message: "Usuario no encontrado." }, { status: 404 });
    }

    // Comparar contraseñas
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Credenciales incorrectas." }, { status: 401 });
    }

    // Generar un token JWT
    const token = jwt.sign(
      {
        id: user.PK_passenger,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        CI: user.CI,
        profileImage: user.profileImage,
        status: user.status,
      },
      SECRET_KEY,
      { expiresIn: "7d" } // Expira en 7 días
    );

    // Responder con el token y datos del usuario
    return NextResponse.json({
      message: "Inicio de sesión exitoso.",
      token, // La app móvil debe guardar este token
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone:user.phone,
        birthDate:user.birthDate,
        address:user.address,
        gender:user.gender,
        profileImage:user.profileImage,
        
        status: user.status
      },
      fares: user.tbfares,
    });
  } catch (error) {
    
    return NextResponse.json({ message: "Error en el servidor." }, { status: 500 });
  }
}

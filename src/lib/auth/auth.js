import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/db/prisma";
import bcrypt from "bcrypt"; // Para comparar contraseñas hasheadas

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "ejemplo@correo.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Debe proporcionar un email y una contraseña.");
        }

        // Buscar usuario en la base de datos
        const existingUser = await prisma.tbusers.findUnique({
          where: { email: credentials.email },
        });

        if (!existingUser) {
          throw new Error("El usuario no existe.");
        }

        // Comparar la contraseña ingresada con la almacenada en la base de datos
        const isPasswordValid = await bcrypt.compare(credentials.password, existingUser.password);
        if (!isPasswordValid) {
          throw new Error("Contraseña incorrecta.");
        }

        // Actualizar la última conexión del usuario
        await prisma.tbusers.update({
          where: { email: credentials.email },
          data: { lastLogin: new Date() },
        });

        // Obtener el privilegio del usuario, añadiendo un chequeo de seguridad
        const userPrivilege = await prisma.tbprivileges.findUnique({
          where: { PK_privilege: existingUser.FK_privilege },
        });

        // Verificar si el privilegio existe antes de retornarlo
        const privilege = userPrivilege?.privilege || "Usuario";

        // Retornar los datos del usuario asegurándose de que todos los campos estén definidos
        return {
          id: existingUser.PK_user?.toString() || "", // Asegura que el ID siempre sea un string
          email: existingUser.email,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          privilege: privilege,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user; // Almacena todo el objeto user, ahora con firstName y lastName
        token.privilege = user.privilege;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user; // Incluye el objeto user completo
      session.privilege = token.privilege;
      return session; 
    },
  },
  pages: {
    signIn: "/login", // Redirigir a una página de inicio de sesión personalizada
  },
});

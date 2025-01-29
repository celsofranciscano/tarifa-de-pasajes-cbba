import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

// Método GET: Obtener privilegio por ID
export async function GET(request, { params }) {
  const { PK_privilege } = params;

  try {
    const privilege = await prisma.tbprivileges.findUnique({
      where: { PK_privilege: Number(PK_privilege) },
    });

    if (!privilege) {
      return NextResponse.json(
        { error: "Privilege not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(privilege);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Método PATCH: Actualizar parcialmente un privilegio
export async function PATCH(request, { params }) {
  const { PK_privilege } = params;
  const updates = await request.json();

  try {
    const updatedPrivilege = await prisma.tbprivileges.update({
      where: { PK_privilege: Number(PK_privilege) },
      data: updates,
    });

    return NextResponse.json({
      message: "Privilege updated successfully",
      data: updatedPrivilege,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating privilege" },
      { status: 500 }
    );
  }
}

// Método DELETE: Eliminar un privilegio
export async function DELETE(request, { params }) {
  const { PK_privilege } = params;

  try {
    await prisma.tbprivileges.delete({
      where: { PK_privilege: Number(PK_privilege) },
    });

    return NextResponse.json({
      message: "Privilege deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting privilege" },
      { status: 500 }
    );
  }
}

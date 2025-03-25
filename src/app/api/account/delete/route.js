import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {

    return NextResponse.json({ message: "Cuenta eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar la cuenta:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

import { IncomingForm } from 'formidable';
import { NextResponse } from 'next/server';
import fs from 'fs';



export async function POST(req) {
  const form = new IncomingForm();
  form.uploadDir = "./public/uploads"; // Directorio donde se guardarán los archivos
  form.keepExtensions = true; // Mantener la extensión original del archivo

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Error al procesar el formulario:', err);
        return reject(new NextResponse(JSON.stringify({ error: 'Error al subir el archivo' }), { status: 500 }));
      }

      const file = files.image[0]; // Obtiene el archivo subido
      const imageUrl = `/uploads/${file.newFilename}`; // Crea la URL del archivo

      // Devuelve la URL de la imagen cargada
      resolve(new NextResponse(JSON.stringify({ imageUrl }), { status: 200 }));
    });
  });
}

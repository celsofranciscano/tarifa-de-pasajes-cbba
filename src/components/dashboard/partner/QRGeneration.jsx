"use client";

import React, { useRef } from "react";
import QRCode from "react-qr-code";

const QRGeneration = ({ value }) => {
  const qrRef = useRef(null);

  // Función para descargar el QR como imagen con márgenes y texto
  const downloadQR = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) {
      console.error("No se encontró el SVG.");
      return;
    }

    // Crear un canvas para dibujar la imagen
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const svgData = new XMLSerializer().serializeToString(svg);

    // Crear una imagen a partir del SVG
    const img = new Image();
    img.onload = () => {
      const width = 1080; // Tamaño total de 1080px
      const height = 1080; // Tamaño total de 1080px
      canvas.width = width;
      canvas.height = height;

      // Fondo blanco
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, height);

      // Márgenes de 10px alrededor del QR
      const qrSize = 960; // QR de 960px
      const qrX = (width - qrSize) / 2;
      const qrY = (height - qrSize) / 2;

      // Fondo blanco alrededor del QR
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(qrX - 10, qrY - 10, qrSize + 20, qrSize + 20);

      // Dibujar el QR
      ctx.drawImage(img, qrX, qrY, qrSize, qrSize);

      // Texto en el centro (el código) con fondo blanco
      ctx.fillStyle = "#000000";
      ctx.font = "bold 32px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const textWidth = ctx.measureText(value).width;
      const textHeight = 38; // Altura aproximada del texto

      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect((width - textWidth) / 2, height / 2 - textHeight / 2, textWidth, textHeight);

      ctx.fillStyle = "#000000";
      ctx.fillText(value, width / 2, height / 2);

      // Descargar la imagen generada
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "codigo_qr.png";
      link.click();
    };

    img.onerror = (error) => {
      console.error("Error al cargar la imagen SVG:", error);
    };

    // Convertir el SVG a base64 y cargar la imagen
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <div className="flex flex-col items-center  w-full space-y-4">
      {/* Ícono para descargar el QR */}
      <div onClick={downloadQR} className="cursor-pointer bg-blue-500 w-full flex items-center justify-between px-4 rounded-md text-white py-2">
        {/* Renderizamos el QRCode fuera de la vista */}
        <div ref={qrRef} style={{ position: "absolute", left: "-9999px" }}>
          <QRCode value={value} size={960} />
        </div>
        <span>Descargar</span>

        {/* Ícono SVG visible para disparar la descarga */}
        <svg
          className="w-6 h-6 text-current"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4h6v6H4V4Zm10 10h6v6h-6v-6Zm0-10h6v6h-6V4Zm-4 10h.01v.01H10V14Zm0 4h.01v.01H10V18Zm-3 2h.01v.01H7V20Zm0-4h.01v.01H7V16Zm-3 2h.01v.01H4V18Zm0-4h.01v.01H4V14Z"
          />
          <path
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 7h.01v.01H7V7Zm10 10h.01v.01H17V17Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default QRGeneration;

"use client";

import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

const QRScanner = ({ onScanSuccess }) => {
  const [data, setData] = useState("Escanea el QR");
  const [active, setActive] = useState(false);

  const handleScan = (result) => {
    if (result && result[0] && result[0].rawValue) {
      const qrData = result[0].rawValue;
      setData(qrData);
      // Llama al callback para enviar el código escaneado al componente padre
      if (onScanSuccess) {
        onScanSuccess(qrData);
      }
    } else {
      console.error("No se pudo obtener el valor del código QR");
      console.log("Resultado:", result);
    }
  };

  const handleError = (error) => {
    console.error("Error al escanear el código QR:", error);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {active && (
        <Scanner
          onScan={handleScan}
          onError={handleError}
          style={{ width: "100%" }}
        />
      )}
      <p className="bg-blue-500 px-4 py-2 rounded-md text-white">{data}</p>
      <div className="flex gap-4">
        {/* Botón para activar el Scanner */}
        <button
          onClick={() => setActive(true)}
          className="p-2 rounded-full bg-green-600 hover:bg-green-700 text-white"
        >
          <svg
            className="w-6 h-6 text-white"
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
              d="M4 18V8a1 1 0 0 1 1-1h1.5l1.707-1.707A1 1 0 0 1 8.914 5h6.172a1 1 0 0 1 .707.293L17.5 7H19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"
            />
            <path
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </button>

        {/* Botón para desactivar el Scanner */}
        <button
          onClick={() => setActive(false)}
          className="p-2 rounded-full bg-red-600 hover:bg-red-700 text-white"
        >
          <svg
            className="w-6 h-6 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L17.94 6M18 18L6.06 6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default QRScanner;

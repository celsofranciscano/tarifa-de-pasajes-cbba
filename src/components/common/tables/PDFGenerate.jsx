function PDFgenerate({ filteredData,title }) {
  const generatePDF = () => {
    if (!Array.isArray(filteredData) || filteredData.length === 0) {
      alert("No hay datos disponibles para exportar.");
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Reporte de Datos</title>
          <style>
            @page {
              size: A4;
              margin: 20mm;
            }
            body {
              font-family: 'Arial', sans-serif;
              margin: 20px;
              color: #333;
            }
            p {
              font-size: 14px;
              color: #666;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
              font-size: 14px;
            }
            table th,
            table td {
              padding: 8px;
              text-align: left;
              border: 1px solid #ddd;
            }
            table th {
              background-color: #f0f0f0;
              font-weight: bold;
            }
            table tbody tr:nth-child(even) {
              background-color: #f9f9f9;
            }
            table tbody tr:hover {
              background-color: #f1f1f1;
            }
            .footer {
              margin-top: 20px;
              font-size: 12px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="font-size: 26px; margin-bottom: 5px;">Agua Potable el Palmar - APOPAL</h1>
            <p style="font-size: 16px; color: #666; margin-top: 0;">Cochabamba - Bolivia</p>
          </div>

          <div style="display: flex; flex-direction: column; align-items: flex-end; font-size: 14px; color: #333; margin-bottom: 20px;">
            <div><strong>Fecha de emisión:</strong> ${new Date().toLocaleDateString("es-ES")}</div>
            <div><strong>Hora de emisión:</strong> ${new Date().toLocaleTimeString("es-ES")}</div>
          </div>

          <h2 style="font-size: 22px; padding-bottom: 5px; margin-bottom: 20px;">
            ${title}
          </h2>

          <table>
            <thead>
              <tr>
                ${Object.keys(filteredData[0])
                  .map((header) => `<th>${header}</th>`)
                  .join("")}
              </tr>
            </thead>
            <tbody>
              ${filteredData
                .map(
                  (row) =>
                    `<tr>${Object.values(row)
                      .map(
                        (value) =>
                          `<td>${
                            value !== null && value !== undefined ? value : ""
                          }</td>`
                      )
                      .join("")}</tr>`
                )
                .join("")}
            </tbody>
          </table>

          <div class="footer">Reporte generado automáticamente</div>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.onload = function () {
        printWindow.print();
      };
    } else {
      console.warn("No se pudo abrir la ventana para imprimir.");
    }
  };

  return (
    <button
      onClick={generatePDF}
      className="flex gap-1 text-sm px-4 py-1 rounded-md text-zinc-600 hover:bg-zinc-200"
    >
      <svg
        className="w-5 h-5"
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
          d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"
        />
      </svg>
      <span>Generar PDF</span>
    </button>
  );
}

export default PDFgenerate;

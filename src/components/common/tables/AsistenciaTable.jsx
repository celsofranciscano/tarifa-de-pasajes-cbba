"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import SearchTable from "./SearchTable";
import PaginationTable from "./PaginationTable";
import CardAsistencia from "./CardAsistencia";
import FilterTable from "./FilterTable";
import ExportTable from "./ExportTable";
import SortTable from "./SortTable";
import QRScanner from "@/components/dashboard/partner/QRScanner";
import CardAsistenciaQR from "./CardAsistenciaQR";
import ConfigTable from "./ConfigTable";

function AsistenciaTable({ url, columns, rows, name, title, params }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null); // Registro encontrado tras el scan
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(200);
  const [counts, setCounts] = useState({
    Presente: 0,
    Falta: 0,
    Retraso: 0,
    Permiso: 0,
  });

  // Función para obtener los datos de la API
  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/${url}`);
      const fetchedData = response.data;

      if (fetchedData && fetchedData.length > 0) {
        setData(fetchedData);
        setFilteredData(fetchedData);

        // Contabiliza los estados de asistencia (asegúrate de que en tu data la propiedad se llame "Control" o "status")
        const counts = fetchedData.reduce(
          (acc, row) => {
            if (row.Control === "Presente") acc.Presente++;
            else if (row.Control === "Falta") acc.Falta++;
            else if (row.Control === "Retraso") acc.Retraso++;
            else if (row.Control === "Permiso") acc.Permiso++;
            return acc;
          },
          { Presente: 0, Falta: 0, Retraso: 0, Permiso: 0 }
        );

        setCounts(counts);
      } else {
        setData([]);
        setFilteredData([]);
        setCounts({
          Presente: 0,
          Falta: 0,
          Retraso: 0,
          Permiso: 0,
        });
        console.log("No se encontraron datos.");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  // Función para recibir el código escaneado y buscar el registro correspondiente
  const handleQRScan = (qrCode) => {
    // Buscamos el registro cuyo código coincida con el escaneado
    const record = data.find((row) => row.code === qrCode);
    if (record) {
      setSelectedRecord(record);
      // También puedes filtrar la data para la tabla si lo deseas:
      setFilteredData([record]);
    } else {
      console.log("No se encontró registro con el código:", qrCode);
      // Opcional: Restaurar la data original o mostrar un mensaje al usuario.
    }
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reinicia la paginación
  };

  // Actualiza las columnas visibles; no se permite que queden vacías
  const handleColumnVisibilityChange = (column, isVisible) => {
    setVisibleColumns((prev) => {
      // Si se intenta ocultar y es la única visible, se ignora
      if (!isVisible && prev.length === 1 && prev.includes(column)) {
        return prev;
      }
      if (isVisible) {
        return prev.includes(column) ? prev : [...prev, column];
      } else {
        return prev.filter((col) => col !== column);
      }
    });
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleRefresh = () => {
    fetchData();
    // También puedes limpiar el registro seleccionado
    setSelectedRecord(null);
  };

  return (
    <section className="grid gap-4 shadow-md rounded-md bg-white py-6 p-4">
      {/* Título */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-xl font-bold">{title}</h1>
      </div>

      {/* Sección del QR Scanner */}
      <div className="grid md:grid-cols-4">
        <QRScanner onScanSuccess={handleQRScan} />
      </div>

      {/* Si se encuentra un registro tras escanear, mostramos el Card de asistencia */}
      {selectedRecord && (
        <div className="my-4">
          <CardAsistenciaQR
            id={selectedRecord.PK_attendance}
            params={params}
            code={selectedRecord.code}
            name={selectedRecord.firstName}
            attendance={selectedRecord.status}
          />
        </div>
      )}

      {/* Filtros y opciones */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 justify-center md:order-last">
          <FilterTable />
          <ExportTable filteredData={filteredData} />
          <SortTable />
          <ConfigTable
            columns={columns}
            rows={rows}
            handleColumnVisibilityChange={handleColumnVisibilityChange}
          />
        </div>

        <div className="flex items-center justify-center gap-2 md:order-first">
          <span>Mostrar</span>
          <select
            className="input"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            <option value={200}>200</option>
          </select>
          <span>registros</span>
        </div>

        <div className="w-full md:w-fit">
          <SearchTable data={data} setFilteredData={setFilteredData} />
        </div>
      </div>

      {/* Contadores */}
      <div className="grid grid-cols-2 md:flex items-center gap-4 mt-4">
        <div className="px-4 py-2 rounded-md bg-blue-500 text-white">
          Presente: {counts.Presente}
        </div>
        <div className="px-4 py-2 rounded-md bg-green-500 text-white">
          Permiso: {counts.Permiso}
        </div>
        <div className="px-4 py-2 rounded-md bg-yellow-500 text-black">
          Retraso: {counts.Retraso}
        </div>
        <div className="px-4 py-2 rounded-md bg-red-500 text-white">
          Falta: {counts.Falta}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 bg-zinc-200 px-4 py-2 rounded-md"
          >
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"
              />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Tabla de datos */}
      <section className="overflow-x-auto rounded-md">
        <table className="w-full text-sm text-left text-zinc-500 bg-zinc-100 rounded-md">
          <thead className="text-xs uppercase bg-zinc-200">
            <tr>
              {columns?.map((column, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-black hover:cursor-pointer"
                >
                  {column}
                </th>
              ))}
              <th className="px-6 py-3 text-black">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <tr key={index} className="border-b border">
                  {rows?.map((field, colIndex) => (
                    <td key={colIndex} className="px-4 text-zinc-500">
                      {field === "status" ? (
                        row[field] === "Falta" ? (
                          <span className="px-2 py-1 rounded-md bg-red-500 text-white">
                            Falta
                          </span>
                        ) : row[field] === "Presente" ? (
                          <span className="px-2 py-1 rounded-md bg-blue-500 text-white">
                            Presente
                          </span>
                        ) : row[field] === "Retraso" ? (
                          <span className="px-2 py-1 rounded-md bg-yellow-500 text-black">
                            Retraso
                          </span>
                        ) : row[field] === "Permiso" ? (
                          <span className="px-2 py-1 rounded-md bg-green-500 text-white">
                            Permiso
                          </span>
                        ) : (
                          row[field]
                        )
                      ) : (
                        row[field]
                      )}
                    </td>
                  ))}
                  <td className="flex items-center py-3 justify-center">
                    <CardAsistencia
                      id={row.PK_attendance}
                      params={params}
                      code={row.code}
                      name={row.firstName}
                      attendance={row.status}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="text-center py-6 text-zinc-500"
                >
                  No hay datos disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Paginación */}
      <PaginationTable
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </section>
  );
}

export default AsistenciaTable;

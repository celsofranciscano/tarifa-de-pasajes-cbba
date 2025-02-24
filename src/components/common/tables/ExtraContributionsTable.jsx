"use client";

import { useState, useEffect } from "react";
import SearchTable from "./SearchTable";
import PaginationTable from "./PaginationTable";
import Link from "next/link";
import FilterTable from "./FilterTable";
import ExportTable from "./ExportTable";
import SortTable from "./SortTable";
import ConfigTable from "./ConfigTable";
function ExtraContributionsTable({
  url,
  columns,
  rows,
  name,
  title,
  params,
  tbpaymentsspecialcontributions,
}) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(200);

  // Contadores de estados
  const [counts, setCounts] = useState({
    "Sin cobrar": 0,
    Cobrado: 0,
  });

  // Asignamos la data recibida por props y contamos los estados
  useEffect(() => {
    if (tbpaymentsspecialcontributions) {
      setData(tbpaymentsspecialcontributions);
      setFilteredData(tbpaymentsspecialcontributions);

      // Contabiliza los estados "Sin cobrar" y "Cobrado"
      const newCounts = tbpaymentsspecialcontributions.reduce(
        (acc, row) => {
          if (row.status === "Sin cobrar") {
            acc["Sin cobrar"]++;
          } else if (row.status === "Cobrado") {
            acc["Cobrado"]++;
          }
          return acc;
        },
        { "Sin cobrar": 0, Cobrado: 0 }
      );
      setCounts(newCounts);
    }
  }, [tbpaymentsspecialcontributions]);

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

  return (
    <section className="grid gap-4 shadow-md rounded-md bg-white py-6 p-4">
      {/* Barra de búsqueda y título */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-xl font-bold">{title}</h1>
      </div>

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

      {/* Contadores de estados */}
      <div className="grid grid-cols-2 md:flex items-center gap-4 mt-4">
        <div className="px-4 py-2 rounded-md bg-red-500 text-white">
          Sin cobrar: {counts["Sin cobrar"]}
        </div>
        <div className="px-4 py-2 rounded-md bg-green-500 text-white">
          Cobrado: {counts.Cobrado}
        </div>
      </div>

      {/* Tabla */}
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
            {paginatedData.map((row, index) => (
              <tr key={index} className="border-b border">
                {rows?.map((field, colIndex) => (
                  <td key={colIndex} className="px-4 text-zinc-500">
                    {field === "status" ? (
                      row[field] === "Sin cobrar" ? (
                        <div className="px-2 py-1 text-sm rounded-md bg-red-500 text-white">
                          Sin cobrar
                        </div>
                      ) : row[field] === "Cobrado" ? (
                        <div className="px-2 py-1 text-sm rounded-md bg-green-500 text-white">
                          Cobrado
                        </div>
                      ) : (
                        row[field]
                      )
                    ) : (
                      row[field]
                    )}
                  </td>
                ))}
                <td className="flex items-center py-3 justify-center">
                  <Link href={`/dashboard/search/${row.FK_partner}/extras`}>
                    <svg
                      class="w-6 h-6"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-width="2"
                        d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </Link>
                </td>
              </tr>
            ))}
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

export default ExtraContributionsTable;

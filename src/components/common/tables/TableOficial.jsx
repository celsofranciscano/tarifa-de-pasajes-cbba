"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import FilterTable from "./FilterTable";
import ExportTable from "./ExportTable";
import SortTable from "./SortTable";
import ConfigTable from "./ConfigTable";
import SearchTable from "./SearchTable";
import EditLink from "./EditLink";
import DetailLink from "./DetailLink";
import CreateLink from "./CreateLink";
import PaginationTable from "./PaginationTable";
import ProfileLink from "./ProfileLink";

function TableOficial({
  url,
  columns,
  rows,
  name,
  title,
  isCreate,
  isProfile,
}) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  // dataSpanish contendrá los registros con las claves renombradas (en español)
  const [dataSpanish, setDataSpanish] = useState([]);
  // visibleColumns controla qué columnas se muestran; inicialmente todas
  const [visibleColumns, setVisibleColumns] = useState(columns);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/${url}`);
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [url]);

  // Actualiza dataSpanish cada vez que cambian filteredData o visibleColumns
  useEffect(() => {
    const renamedData = filteredData.map((item) => {
      let renamedItem = {};
      visibleColumns.forEach((col) => {
        const index = columns.indexOf(col);
        if (index !== -1) {
          const apiKey = rows[index];
          renamedItem[col] = item[apiKey];
        }
      });
      return renamedItem;
    });
    setDataSpanish(renamedData);
    setCurrentPage(1); // Reinicia la paginación al cambiar datos
  }, [filteredData, columns, rows, visibleColumns]);

  const totalPages = Math.ceil(dataSpanish.length / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
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

  const paginatedData = dataSpanish.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <section className="grid gap-4 shadow-md rounded-md bg-white py-6 p-4">
      {/* Barra de búsqueda y filtro */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-xl font-bold">{title}</h1>
        {isCreate && <CreateLink name={name} href={"/"} />}
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 justify-center md:order-last">
          <FilterTable />
          <ExportTable
            filteredData={filteredData}
            dataSpanish={dataSpanish}
            title={title}
          />
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
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span>registros</span>
        </div>
        <div className="w-full md:w-fit">
          <SearchTable data={data} setFilteredData={setFilteredData} />
        </div>
      </div>

      {/* Tabla */}
      <section className="overflow-x-auto rounded-md">
        <table className="w-full text-sm text-left text-zinc-500 bg-zinc-100 rounded-md">
          <thead className="text-xs uppercase bg-zinc-200">
            <tr>
              {visibleColumns.map((column, index) => (
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
                {visibleColumns.map((column, colIndex) => (
                  <td key={colIndex} className="px-4 text-zinc-500">
                    {row[column] !== undefined ? row[column] : ""}
                  </td>
                ))}
                <td className="flex items-center py-3 gap-4 justify-center">
                  {isProfile ? (
                    <ProfileLink id={row["Codigo"]} />
                  ) : (
                    <>
                      <EditLink id={row[columns[0]]} />
                      <DetailLink id={row[columns[0]]} />
                    </>
                  )}
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

export default TableOficial;

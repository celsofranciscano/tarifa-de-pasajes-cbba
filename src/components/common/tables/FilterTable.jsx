"use client";

import { useState, useEffect, useRef } from "react";
import Tooltip from "@/components/common/tooltip/Tooltip";

function FilterTable({ filteredData, dataSpanish }) {
  const [showOptions, setShowOptions] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    createdAtRange: { start: "", end: "" },
    dateRange: { month: "", year: "" },
    yearRange: { start: "", end: "" },
  });

  const cardRef = useRef(null); // Referencia para el contenedor del menú

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-10 inline-block" ref={cardRef}>
      <Tooltip content="Filtrar" position="top">
        <button
          className="hover:bg-zinc-200 rounded-md shadow-md p-2"
          onClick={toggleOptions}
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
              strokeWidth="2"
              d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"
            />
          </svg>
        </button>
      </Tooltip>

      <div
        className={`absolute grid top-full right-0 mt-2 bg-white p-6 w-64 shadow-2xl rounded-md ${
          showOptions ? "block" : "hidden"
        }`}
      >
        <p className="text-sm text-zinc-600 pb-2">Filtrar según:</p>

        {/* Filtro de Status */}
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm text-zinc-600">
            Estado
          </label>
          <select
            id="status"
            name="status"
            className="w-full p-2 mt-1 border rounded-md"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">Seleccionar Estado</option>
            <option value="Sin servicio">Sin servicio</option>
            <option value="Reactivado">Reactivado</option>
          </select>
        </div>

        {/* Filtro de rango de fechas de creación (createdAt) */}
        <div className="mb-4">
          <label className="block text-sm text-zinc-600">
            Fecha de creación
          </label>
          <div className="flex flex-col  sm:space-x-2">
            <input
              type="date"
              name="createdAtRangeStart"
              value={filters.createdAtRange.start}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  createdAtRange: {
                    ...prev.createdAtRange,
                    start: e.target.value,
                  },
                }))
              }
              className="w-full sm:w-1/2 p-2 border rounded-md"
            />
            <input
              type="date"
              name="createdAtRangeEnd"
              value={filters.createdAtRange.end}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  createdAtRange: {
                    ...prev.createdAtRange,
                    end: e.target.value,
                  },
                }))
              }
              className="w-full sm:w-1/2 p-2 border rounded-md"
            />
          </div>
        </div>

        {/* Filtro de fecha (Mes-Año) */}
        <div className="mb-4">
          <label className="block text-sm text-zinc-600">Mes-Año</label>
          <div className="flex flex-col  sm:space-x-2">
            <input
              type="month"
              name="monthYear"
              value={filters.dateRange.month}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  dateRange: { ...prev.dateRange, month: e.target.value },
                }))
              }
              className="w-full sm:w-1/2 p-2 border rounded-md"
            />
            <input
              type="month"
              name="monthYear"
              value={filters.yearRange.start}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  yearRange: { ...prev.yearRange, start: e.target.value },
                }))
              }
              className="w-full sm:w-1/2 p-2 border rounded-md"
              placeholder="Año"
            />
          </div>
        </div>

        {/* Filtro de rango de años */}
        <div className="mb-4">
          <label className="block text-sm text-zinc-600">Año</label>
          <div className="flex flex-col sm:flex-row sm:space-x-2">
            <input
              type="number"
              name="yearRangeStart"
              value={filters.yearRange.start}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  yearRange: { ...prev.yearRange, start: e.target.value },
                }))
              }
              className="w-full sm:w-1/2 p-2 border rounded-md"
              placeholder="Año"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterTable;

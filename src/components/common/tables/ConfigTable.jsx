"use client";

import { useState, useEffect, useRef } from "react";
import Tooltip from "@/components/common/tooltip/Tooltip";

function ConfigTable({ handleColumnVisibilityChange, columns }) {
  const [showOptions, setShowOptions] = useState(false);
  // Estado para cada columna: todas visibles por defecto
  const [selectedColumns, setSelectedColumns] = useState(
    columns.reduce((acc, column) => ({ ...acc, [column]: true }), {})
  );
  const cardRef = useRef(null);

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  // Al cambiar el switch, se evita ocultar la última columna
  const handleToggleChange = (column) => {
    // Si está visible y es la única seleccionada, no se permite desactivarla
    if (selectedColumns[column] && Object.values(selectedColumns).filter(Boolean).length === 1) {
      return;
    }
    const newSelected = { ...selectedColumns, [column]: !selectedColumns[column] };
    setSelectedColumns(newSelected);
    handleColumnVisibilityChange(column, newSelected[column]);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-10 inline-block" ref={cardRef}>
      <Tooltip content="Seleccionar" position="top">
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
              strokeWidth="3"
              d="M12 6h.01M12 12h.01M12 18h.01"
            />
          </svg>
        </button>
      </Tooltip>

      <div
        className={`absolute grid top-full right-0 mt-2 bg-white p-6 w-64 shadow-2xl rounded-md ${
          showOptions ? "block" : "hidden"
        }`}
      >
        <p className="text-sm text-zinc-600 pb-2">Seleccionar campos:</p>
        {columns.map((column, index) => (
          <div
            key={index}
            className="flex gap-1 text-sm px-4 py-1 rounded-md text-zinc-600 hover:bg-zinc-200 items-center justify-between"
          >
            <label htmlFor={`toggle-${index}`} className="text-sm text-gray-700 flex justify-between items-center  w-full cursor-pointer">
              {column}
            <input
              id={`toggle-${index}`}
              type="checkbox"
              checked={selectedColumns[column]}
              onChange={() => handleToggleChange(column)}
              className="hidden peer"
              />
            <div className="relative">
              <div
                className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-300 cursor-pointer ${
                  selectedColumns[column] ? "bg-blue-500" : "bg-gray-300"
                }`}
                >
                <div
                  className={`w-3 h-3 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    selectedColumns[column] ? "translate-x-4" : ""
                  }`}
                  ></div>
              </div>
            </div>
                  </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConfigTable;

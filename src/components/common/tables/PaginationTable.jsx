"use client";

function PaginationTable({ currentPage, totalPages, handlePageChange }) {
  // Definir el rango de páginas a mostrar
  const pageRange = 3;
  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, currentPage + 1);

  // Mostrar las páginas alrededor de la página actual
  const pagesToShow = [];
  for (let i = startPage; i <= endPage; i++) {
    pagesToShow.push(i);
  }

  return (
    <div className="flex items-center justify-between mt-4 space-x-2">
      <div className="mb-4">
        <span className="text-gray-400">
          Página {currentPage} de {totalPages}
        </span>
      </div>

      <div className="flex items-center bg-zinc-800 rounded-md text-xs py-2 px-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 text-black ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Mostrar solo las páginas alrededor de la actual */}
        {pagesToShow.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 rounded ${currentPage === page ? "bg-zinc-500 text-white" : "text-zinc-200"}`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 text-black ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default PaginationTable;

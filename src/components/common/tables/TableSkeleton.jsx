export default function TableSkeleton() {
  return (
    <div className="p-4 bg-white rounded-md shadow-md grid gap-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />{" "}
        {/* Título */}
        <div className="h-10 w-40 bg-gray-200 rounded-lg animate-pulse" />{" "}
        {/* Botón */}
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-16 bg-gray-200 rounded-md animate-pulse" />{" "}
          {/* "Mostrar" */}
          <div className="h-9 w-20 bg-gray-200 rounded-md animate-pulse" />{" "}
          {/* Dropdown */}
          <div className="h-5 w-20 bg-gray-200 rounded-md animate-pulse" />{" "}
          {/* "registros" */}
        </div>
        <div className="h-10 w-80 bg-gray-200 rounded-md animate-pulse" />{" "}
        {/* Search bar */}
        <div className="flex items-center gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-5 w-5 bg-gray-200 rounded animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-zinc-100 rounded-md border">
        {/* Table Header */}
        <div className="grid grid-cols-6 gap-4 bg-zinc-200 p-4 rounded-t-lg">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-3 w-full bg-zinc-300 rounded animate-pulse"
            />
          ))}
        </div>

        {/* Table Body */}
        {[...Array(4)].map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="grid grid-cols-6 gap-4 px-4  py-2 border-b bg-gray-50/50"
          >
            <div className="h-5 w-6 bg-gray-200 rounded animate-pulse " />
            <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-28 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-36 bg-gray-200 rounded animate-pulse" />

            <div className="flex gap-2 items-center justify-center">
              <div className="h-5 w-5 bg-gray-200 rounded animate-pulse" />
              <div className="h-5 w-5 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-between items-center px-2">
        <div className="text-sm text-gray-500">
          <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="flex gap-1">
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 w-8 bg-blue-100 rounded animate-pulse"></div>
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

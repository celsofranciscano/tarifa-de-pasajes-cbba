import TableOficial from "@/components/common/tables/TableOficial";
function PartnersPage() {
  const columns = [
    "ID",
    "Linea de transporte",
    "Ruta",
    "Descripcion",
  ];
  const rows = [
    "PK_transport",
    "name",
    "route",
    "description",
  ]

  return (
    <section className="grid gap-4">
      <TableOficial
        url={"dashboard/transportline"}
        columns={columns}
        rows={rows}
        name={"Transporte"}
        title={"Lista de las lineas de transporte"}
        isCreate={true}
      />
    </section>
  );
}

export default PartnersPage;

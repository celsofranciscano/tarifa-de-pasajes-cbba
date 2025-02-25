import TableOficial from "@/components/common/tables/TableOficial";
function PartnersPage() {
  const columns = [
    "ID",
    "Linia de transporte",
    "Placa",
    "Relacion con la incidencia",
    "Fecha de denuncia",
  ];
  const rows = [
    "PK_complaint",
    "transportLine",
    "vehiclePlate",
    "incidentRelation",
    "createdAt",
  ]

  return (
    <section className="grid gap-4">
      <TableOficial
        url={"dashboard/complaints"}
        columns={columns}
        rows={rows}
        name={"Denuncia"}
        title={"Lista de toda las denuncias"}
        isCreate={true}
      />
    </section>
  );
}

export default PartnersPage;

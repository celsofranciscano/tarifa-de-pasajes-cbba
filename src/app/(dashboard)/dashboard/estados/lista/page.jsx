import TableOficial from "@/components/common/tables/TableOficial";
function PartnersPage() {
  const columns = [
    "ID",
    "Estado",
    "Descripcion",
  ];
  const rows = [
    "PK_status",
    "statusName",
    "description",
  ]

  return (
    <section className="grid gap-4">
      <TableOficial
        url={"dashboard/statuscomplaints"}
        columns={columns}
        rows={rows}
        name={"Estado"}
        title={"Estado de la denuncia"}
        isCreate={true}
      />
    </section>
  );
}

export default PartnersPage;

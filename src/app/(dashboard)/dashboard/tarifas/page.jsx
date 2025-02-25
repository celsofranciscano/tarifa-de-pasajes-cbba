import TableOficial from "@/components/common/tables/TableOficial";
function PartnersPage() {
  const columns = [
    "ID",
    "Tipo de usuario",
    "Monto Bs"
  ];
  const rows = [
    "PK_fare",
    "userType",
    "amount",
  ]

  return (
    <section className="grid gap-4">
      <TableOficial
        url={"dashboard/fares"}
        columns={columns}
        rows={rows}
        name={"Tarifa"}
        title={"Tarifa diferenciado"}
        isCreate={true}
      />
    </section>
  );
}

export default PartnersPage;

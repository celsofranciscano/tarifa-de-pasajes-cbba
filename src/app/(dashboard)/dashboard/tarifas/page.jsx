import TableOficial from "@/components/common/tables/TableOficial";
function PartnersPage() {
  const columns = [
    "ID",
    "Cubo Minimo",
    "Cubo Maximo",
    "Precio",
    "Precio Fijo",
  ];
  const rows = [
    "PK_price",
    "min_cubes",
    "max_cubes",
    "price",
    "fixed_price"
  ]

  return (
    <section className="grid gap-4">
      <TableOficial
        url={"dashboard/prices"}
        columns={columns}
        rows={rows}
        name={"Tarifa"}
        title={"Tarifas por metro cubico"}
        isCreate={true}
      />
    </section>
  );
}

export default PartnersPage;

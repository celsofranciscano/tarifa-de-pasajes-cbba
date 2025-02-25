import TableOficial from "@/components/common/tables/TableOficial";
function PartnersPage() {
  const columns = [
    "ID",
    "Nombre",
    "Apellido",
    "Correo",
    "Telefono"
  ];
  const rows = [
    "PK_passenger",
    "firstName",
    "lastName",
    "email",
    "phone",
  ]

  return (
    <section className="grid gap-4">
      <TableOficial
        url={"dashboard/passenger"}
        columns={columns}
        rows={rows}
        name={"Pasajero"}
        title={"Pasajeros"}
        isCreate={true}
      />
    </section>
  );
}

export default PartnersPage;

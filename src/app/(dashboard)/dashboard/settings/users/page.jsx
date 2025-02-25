import Table from "@/components/common/tables/TableOficial";

function AdministratorsPage() {
  const columns = [
    "ID",
    "Nombre",
    "Apellido",
    "Email",
    "Ultima sesion",
    "Estado",
  ];

  const rows = [

    "PK_user",
    "firstName",
    "lastName",
    "email",
    "lastLogin",
    "status",

  ]


  return (
    <section className="grid gap-4">
      <Table
        url={"settings/users"}
        columns={columns}
        rows={rows}
        name={"Usuario"}
        title={"Administradores"}
        isCreate={true}
      />
    </section>
  );
}

export default AdministratorsPage;

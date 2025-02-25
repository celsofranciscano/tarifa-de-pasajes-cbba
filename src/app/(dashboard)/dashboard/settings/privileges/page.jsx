import Table from "@/components/common/tables/TableOficial";

function PrivilegePage() {
  const columns = [
    "ID",
    "Privilegios",
    "Estado",
  ];

  const rows = [

    "PK_privilege",
    "privilege",
    "status"

  ]


  return (
    <section className="grid gap-4">
      <Table
        url={"settings/privileges"}
        columns={columns}
        rows={rows}
        name={"Privilegio"}
        title={"Privilegios"}
        isCreate={true}
      />
    </section>
  );
}

export default PrivilegePage;

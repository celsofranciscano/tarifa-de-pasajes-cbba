import AsistenciaTable from "@/components/common/tables/AsistenciaTable";
function Asistencia({params}) {
  const columns = [ "Codigo", "Nombre completo","Control",];
  const rows = ["code","firstName","status"]

  return (
    <section className="grid grid-cols-1 gap-4">
      <AsistenciaTable
        url={`dashboard/activities/${params.PK_activity}/asistencia`}
        columns={columns}
        rows={rows}
        name={"asistencia"}
        title={"Asistencia"}
        params={params}
      />
    </section>
  );
}

export default Asistencia;

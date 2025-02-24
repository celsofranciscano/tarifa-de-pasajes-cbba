import ExtraContributionsTable from "@/components/common/tables/ExtraContributionsTable";
function ExtraContributions({ params, tbpaymentsspecialcontributions }) {
  const columns = ["Codigo", "Nombre completo", "Control"];
  const rows = ["code", "firstName", "status"];

  return (
    <section className="grid grid-cols-1 gap-4">
      <ExtraContributionsTable
        url={`dashboard/activities/${params.PK_activity}/asistencia`}
        columns={columns}
        rows={rows}
        name={"asistencia"}
        title={"Asistencia"}
        params={params}
        tbpaymentsspecialcontributions={tbpaymentsspecialcontributions}
      />
    </section>
  );
}

export default ExtraContributions;

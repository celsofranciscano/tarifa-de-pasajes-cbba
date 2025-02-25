import axios from "axios";

async function DetailPagePrivilege({ params }) {
  let privilegeData;
  try {
    const response = await axios.get(
      `${process.env.API_URL}/api/settings/privileges/${params.PK_privilege}`
    );

    privilegeData = response.data;
  } catch (error) {}

  return (
    <section className="grid gap-4">
      <section className="p-4 bg-zinc-900 shadow-md grid gap-4 rounded-md">
        <h1 className="font-medium text-2xl pb-4 border-b">
          Detalles del Privilegio
        </h1>

        {privilegeData ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-zinc-400">
            {/* ID del Privilegio */}
            <label className="flex flex-col gap-1">
              ID
              <input type="text" className="input" value={privilegeData.PK_privilege} disabled />
            </label>

            {/* Nombre del Privilegio */}
            <label className="flex flex-col gap-1">
              Nombre del Privilegio
              <input type="text" className="input" value={privilegeData.privilege} disabled />
            </label>

            {/* Estado */}
            <label className="flex flex-col gap-1">
              Estado
              <input type="text" className="input" value={privilegeData.status ? "Activo" : "Inactivo"} disabled />
            </label>

            {/* Fecha de Creación */}
            <label className="flex flex-col gap-1">
              Fecha de Creación
              <input type="text" className="input" value={new Date(privilegeData.createdAt).toLocaleDateString()} disabled />
            </label>

            {/* Última Actualización */}
            <label className="flex flex-col gap-1">
              Última Actualización
              <input
                type="text"
                className="input"
                value={privilegeData.updatedAt ? new Date(privilegeData.updatedAt).toLocaleDateString() : "No actualizada"}
                disabled
              />
            </label>
          </div>
        ) : (
          <p>Cargando datos...</p>
        )}
      </section>
    </section>
  );
}

export default DetailPagePrivilege;

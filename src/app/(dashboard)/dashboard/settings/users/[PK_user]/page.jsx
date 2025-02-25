import axios from "axios";

async function DetailPageUser({ params }) {
  let userData;
  try {
    const response = await axios.get(
      `${process.env.API_URL}/api/settings/users/${params.PK_user}`
    );
    userData = response.data;
  } catch (error) {}

  return (
    <section className="grid gap-4">
      <section className="p-4 bg-zinc-900 shadow-md grid gap-4 rounded-md">
        <h1 className="font-medium text-2xl pb-4 border-b">Detalles del Usuario</h1>

        {userData ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-zinc-400">
            <label className="flex flex-col gap-1">
              Nombre
              <input type="text" className="input" value={userData.firstName} disabled />
            </label>

            <label className="flex flex-col gap-1">
              Apellido
              <input type="text" className="input" value={userData.lastName} disabled />
            </label>

            <label className="flex flex-col gap-1">
              Correo Electrónico
              <input type="text" className="input" value={userData.email} disabled />
            </label>

            <label className="flex flex-col gap-1">
              Teléfono
              <input
                type="text"
                className="input"
                value={userData.phoneNumber || "No especificado"}
                disabled
              />
            </label>

            <label className="flex flex-col gap-1">
              Estado
              <input
                type="text"
                className="input"
                value={userData.status ? "Activo" : "Inactivo"}
                disabled
              />
            </label>

            <label className="flex flex-col gap-1">
              Último Acceso
              <input
                type="text"
                className="input"
                value={userData.lastLogin ? new Date(userData.lastLogin).toLocaleString() : "No disponible"}
                disabled
              />
            </label>

            <label className="flex flex-col gap-1">
              Privilegio
              <input
                type="text"
                className="input"
                value={userData.tbprivileges?.privilege || "No especificado"}
                disabled
              />
            </label>

            <label className="flex flex-col gap-1">
              Fecha de creación
              <input
                type="text"
                className="input"
                value={userData.createdAt ? new Date(userData.createdAt).toLocaleString() : "No disponible"}
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

export default DetailPageUser;

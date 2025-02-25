"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Calendar,
  AlertCircle,
  Image,
  MapPin,
  Shield,
  Car,
  FileText,
  User,
  Info,
  Clock,
  Flag,
} from "lucide-react";

function FeedDenuncias() {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await axios.get(`/api/account/feed`);
        setFeed(response.data);
        setLoading(false);
      } catch (err) {
        setError("Hubo un error al cargar las denuncias.");
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Función para obtener color según el estado
  const getStatusColor = (statusName) => {
    switch (statusName.toLowerCase()) {
      case "pendiente":
        return "text-amber-400 bg-amber-400/10 border-amber-400/20";
      case "revision":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      case "resuelto":
        return "text-green-400 bg-green-400/10 border-green-400/20";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
  };

  if (loading) {
    return (
      <section className="flex justify-center items-center p-10 min-h-[300px]">
        <div className="text-center">
          <div className="animate-spin rounded-md h-12 w-12 border-t-2 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-xl text-gray-400">Cargando denuncias...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex justify-center items-center p-10 min-h-[300px]">
        <div className="text-center text-red-500">
          <AlertCircle size={48} className="mx-auto mb-4" />
          <p className="text-lg">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 relative bg-gradient-to-b from-dark to-black">
      <div className="container px-4 md:px-12 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-gold glow-effect">
          Denuncias Recientes
        </h2>

        {feed.length === 0 ? (
          <div className="bg-dark/80 p-8 rounded-md border border-gold/20 text-center">
            <FileText size={48} className="mx-auto mb-4 text-gray-500" />
            <p className="text-xl text-gray-500">
              No hay denuncias disponibles.
            </p>
          </div>
        ) : (
          <ul className="space-y-12">
            {feed.map((denuncia) => (
              <li
                key={denuncia.PK_complaint}
                className="bg-dark/80 rounded-md border border-gold/20 shadow-lg transition-all overflow-hidden"
              >
                {/* Encabezado de la denuncia */}
                <div className="bg-black/40 px-6 py-4 border-b border-gold/10 flex justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-gold/20 p-2 rounded-md">
                      <Flag size={20} className="text-gold" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        Denuncia #{denuncia.PK_complaint}
                      </h3>
                      <p className="text-sm text-gray-400 flex items-center gap-1">
                        <Clock size={14} />
                        {formatDate(denuncia.createdAt)}
                      </p>
                    </div>
                  </div>

               
                </div>

                <div className="">
                  <div className="grid grid-cols-1 lg:grid-cols-3 ">
                    {/* Columna 1: Imagen y datos básicos */}
                    <div className="lg:col-span-1 ">
                      {/* Imagen */}
                      {denuncia.image ? (
                        <div className="overflow-hidden   bg-black/50">
                          <img
                            className="w-full h-auto object-cover transition-transform hover:scale-105"
                            src={denuncia.image}
                            alt="Evidencia de denuncia"
                          />
                        </div>
                      ) : (
                        <div className=" bg-black/50 h-48 flex items-center justify-center border border-gray-800">
                          <div className="text-center text-gray-600">
                            <Image size={32} className="mx-auto mb-2" />
                            <p className="text-sm">Sin imagen</p>
                          </div>
                        </div>
                      )}

                      {/* Información del transporte */}
                      <div className="bg-black/30  p-5 border border-gray-800">
                        <h4 className="text-lg font-medium text-gold mb-4 flex items-center gap-2">
                          <Car size={18} />
                          Información del Transporte
                        </h4>

                        <div className="space-y-4 grid grid-cols-2 md:grid-cols-1">
                          <div className="flex items-center gap-3">
                            <div className="bg-gray-800/80 p-2 rounded-md w-10 h-10 flex items-center justify-center flex-shrink-0">
                              <MapPin size={16} className="text-gold" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">
                                Línea de transporte
                              </p>
                              <p className="font-medium text-white">
                                {denuncia.transportLine || "No especificado"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="bg-gray-800/80 p-2 rounded-md w-10 h-10 flex items-center justify-center flex-shrink-0">
                              <Car size={16} className="text-gold" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">
                                Placa del vehículo
                              </p>
                              <p className="font-medium text-white">
                                {denuncia.vehiclePlate || "No especificado"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="bg-gray-800/80 p-2 rounded-md w-10 h-10 flex items-center justify-center flex-shrink-0">
                              <User size={16} className="text-gold" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">
                                Relación con el incidente
                              </p>
                              <p className="font-medium text-white">
                                {denuncia.incidentRelation}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="bg-gray-800/80 p-2 rounded-md w-10 h-10 flex items-center justify-center flex-shrink-0">
                              <User size={16} className="text-gold" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">
                                Estado de la denuncia
                              </p>
                              <p className="font-medium text-white">
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`w-3 h-3 rounded-md ${
                                      denuncia.tbstatuscomplaints.statusName.toLowerCase() ===
                                      "pendiente"
                                        ? "bg-amber-400"
                                        : denuncia.tbstatuscomplaints.statusName.toLowerCase() ===
                                          "revision"
                                        ? "bg-blue-400"
                                        : "bg-green-400"
                                    }`}
                                  ></div>
                                  <span className="font-medium">
                                    {denuncia.tbstatuscomplaints.statusName}
                                  </span>
                                </div>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Columna 2-3: Detalles y violaciones */}
                    <div className="lg:col-span-2">
                      {/* Descripción */}
                      <div className="bg-black/30  p-5 border border-gray-800">
                        <h4 className="text-lg font-medium text-gold mb-4 flex items-center gap-2">
                          <Info size={18} />
                          Descripción del Incidente
                        </h4>

                        <div className="bg-black/40 p-4 rounded-lg border border-gray-700">
                          <p className="text-gray-300">
                            {denuncia.description ? (
                              denuncia.description
                            ) : (
                              <span className="text-gray-500 italic">
                                No hay descripción proporcionada
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Infracciones */}
                      <div className="bg-black/30  p-5 border border-gray-800">
                        <h4 className="text-lg font-medium text-gold mb-4 flex items-center gap-2">
                          <Shield size={18} />
                          Infracciones Reportadas
                        </h4>

                        <div className="">
                          <ul className="grid grid-cols-1 gap-3">
                            {JSON.parse(denuncia.violations).map(
                              (violation, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-3 bg-red-500/10 p-3 rounded-lg border border-red-500/20"
                                >
                                  <AlertCircle
                                    className="text-red-400 mt-0.5 flex-shrink-0"
                                    size={16}
                                  />
                                  <span className="text-gray-200">
                                    {violation}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default FeedDenuncias;

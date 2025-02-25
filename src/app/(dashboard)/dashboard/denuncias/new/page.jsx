"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Car, MapPin, User, Shield, Info, Image, FileText, AlertCircle, Send, Clock, Tag, Flag, Check } from "lucide-react";

function FormularioDenuncia() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data) => {
    setSubmitting(true);
    setErrorMessage(null);
    try {
      const formData = new FormData();
      formData.append("transportLine", data.transportLine);
      formData.append("vehiclePlate", data.vehiclePlate);
      formData.append("violations", JSON.stringify(data.violations));
      formData.append("incidentRelation", data.incidentRelation);
      formData.append("description", data.description);
      if (data.image[0]) formData.append("image", data.image[0]);

      await axios.post("/api/account/report", formData);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setErrorMessage("Hubo un error al realizar la denuncia. Por favor, intente nuevamente.");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSubmitting(false);
    }
  };

  // Verificar si hay violaciones seleccionadas
  const violations = watch("violations");
  const hasViolations = violations && (Array.isArray(violations) ? violations.length > 0 : !!violations);

  return (
    <section className="py-20 relative bg-gradient-to-b from-dark to-black">
      <div className="container px-4 md:px-12 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 text-gold glow-effect">
          Realiza una Denuncia
        </h2>
        
        <p className="text-gray-400 text-center mb-16 max-w-3xl mx-auto">
          Complete el formulario a continuación para reportar una infracción. Todos los campos marcados con * son obligatorios.
        </p>

        {success ? (
          <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-8 text-center mb-8">
            <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-green-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">¡Denuncia Realizada con Éxito!</h3>
            <p className="text-gray-300 mb-6">Su denuncia ha sido registrada y será procesada por nuestro equipo.</p>
            <button 
              onClick={() => setSuccess(false)} 
              className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition-colors"
            >
              Realizar Otra Denuncia
            </button>
          </div>
        ) : (
          <>
            {errorMessage && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 mb-8">
                <AlertCircle className="text-red-400 flex-shrink-0" />
                <span className="text-white">{errorMessage}</span>
              </div>
            )}

            <div className="bg-dark/80 rounded-2xl border border-gold/20 shadow-lg overflow-hidden mb-8">
              <div className="bg-black/40 px-6 py-4 border-b border-gold/10 flex items-center gap-3">
                <div className="bg-gold/20 p-2 rounded-full">
                  <Flag size={20} className="text-gold" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Información de la Denuncia
                </h3>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Columna 1: Información del transporte e imagen */}
                  <div className="space-y-8">
                    {/* Información del transporte */}
                    <div className="bg-black/30 rounded-xl p-5 border border-gray-800">
                      <h4 className="text-lg font-medium text-gold mb-4 flex items-center gap-2">
                        <Car size={18} />
                        Información del Transporte
                      </h4>
                      
                      {/* Línea de transporte */}
                      <div className="mb-6">
                        <label className="text-gray-300 mb-2 flex items-center gap-2" htmlFor="transportLine">
                          <MapPin size={16} className="text-gold" />
                          Línea de Transporte <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="transportLine"
                          type="text"
                          className="w-full p-3 rounded-lg border border-gray-700 bg-black/50 text-white focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors"
                          placeholder="Ej. Línea 1, Metro, Bus 104"
                          {...register("transportLine", { required: "Este campo es obligatorio" })}
                        />
                        {errors.transportLine && (
                          <span className="text-red-400 text-sm flex items-center gap-1 mt-1">
                            <AlertCircle size={14} />
                            {errors.transportLine.message}
                          </span>
                        )}
                      </div>

                      {/* Placa del vehículo */}
                      <div>
                        <label className="text-gray-300 mb-2 flex items-center gap-2" htmlFor="vehiclePlate">
                          <Car size={16} className="text-gold" />
                          Placa del Vehículo <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="vehiclePlate"
                          type="text"
                          className="w-full p-3 rounded-lg border border-gray-700 bg-black/50 text-white focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors"
                          placeholder="Ej. ABC-123"
                          {...register("vehiclePlate", { required: "Este campo es obligatorio" })}
                        />
                        {errors.vehiclePlate && (
                          <span className="text-red-400 text-sm flex items-center gap-1 mt-1">
                            <AlertCircle size={14} />
                            {errors.vehiclePlate.message}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Imagen */}
                    <div className="bg-black/30 rounded-xl p-5 border border-gray-800">
                      <h4 className="text-lg font-medium text-gold mb-4 flex items-center gap-2">
                        <Image size={18} />
                        Evidencia Fotográfica
                      </h4>
                      
                      <div className="mb-3">
                        <label className="text-gray-300 mb-3 block" htmlFor="image">
                          Imagen de Evidencia (Opcional)
                        </label>
                        
                        <div className={`border-2 border-dashed ${imagePreview ? 'border-yellow-400/50' : 'border-gray-700'} rounded-lg p-4 text-center transition-colors`}>
                          <input
                            id="image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files[0]) {
                                setImagePreview(URL.createObjectURL(e.target.files[0]));
                              }
                            }}
                            {...register("image")}
                          />
                          
                          {!imagePreview ? (
                            <label htmlFor="image" className="cursor-pointer block">
                              <div className="flex flex-col items-center justify-center">
                                <Image size={40} className="text-gray-500 mb-3" />
                                <p className="text-gray-400 mb-1">Haga clic para subir una imagen</p>
                                <p className="text-gray-600 text-sm">PNG, JPG, JPEG (máx. 5MB)</p>
                              </div>
                            </label>
                          ) : (
                            <div className="relative">
                              <img
                                src={imagePreview}
                                alt="Previsualización de la imagen"
                                className="rounded-lg max-h-60 mx-auto object-cover"
                              />
                              <button
                                type="button"
                                className="absolute top-2 right-2 bg-red-500 rounded-full p-1 text-white"
                                onClick={() => setImagePreview(null)}
                              >
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Columna 2: Infracciones, relación y descripción */}
                  <div className="space-y-8">
                    {/* Infracciones */}
                    <div className="bg-black/30 rounded-xl p-5 border border-gray-800">
                      <h4 className="text-lg font-medium text-gold mb-4 flex items-center gap-2">
                        <Shield size={18} />
                        Infracciones <span className="text-red-400">*</span>
                      </h4>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 p-2 px-3 rounded-lg hover:bg-black/30 transition-colors">
                          <input
                            id="violation1"
                            type="checkbox"
                            className="w-4 h-4 accent-gold"
                            value="Incumplimiento de criterios de Calidad"
                            {...register("violations", { required: "Debe seleccionar al menos una infracción" })}
                          />
                          <label className="text-white cursor-pointer flex-1" htmlFor="violation1">
                            Incumplimiento de criterios de Calidad
                          </label>
                        </div>
                        <div className="flex items-center gap-2 p-2 px-3 rounded-lg hover:bg-black/30 transition-colors">
                          <input
                            id="violation2"
                            type="checkbox"
                            className="w-4 h-4 accent-gold"
                            value="Incumplimiento de criterios de Seguridad"
                            {...register("violations")}
                          />
                          <label className="text-white cursor-pointer flex-1" htmlFor="violation2">
                            Incumplimiento de criterios de Seguridad
                          </label>
                        </div>
                        <div className="flex items-center gap-2 p-2 px-3 rounded-lg hover:bg-black/30 transition-colors">
                          <input
                            id="violation3"
                            type="checkbox"
                            className="w-4 h-4 accent-gold"
                            value="Cobro de tarifas superiores a la Ley"
                            {...register("violations")}
                          />
                          <label className="text-white cursor-pointer flex-1" htmlFor="violation3">
                            Cobro de tarifas superiores a la Ley
                          </label>
                        </div>
                        <div className="flex items-center gap-2 p-2 px-3 rounded-lg hover:bg-black/30 transition-colors">
                          <input
                            id="violation4"
                            type="checkbox"
                            className="w-4 h-4 accent-gold"
                            value="No recoger un pasajero"
                            {...register("violations")}
                          />
                          <label className="text-white cursor-pointer flex-1" htmlFor="violation4">
                            No recoger un pasajero
                          </label>
                        </div>
                        <div className="flex items-center gap-2 p-2 px-3 rounded-lg hover:bg-black/30 transition-colors">
                          <input
                            id="violation5"
                            type="checkbox"
                            className="w-4 h-4 accent-gold"
                            value="Abandonar al usuario a medio recorrido"
                            {...register("violations")}
                          />
                          <label className="text-white cursor-pointer flex-1" htmlFor="violation5">
                            Abandonar al usuario a medio recorrido
                          </label>
                        </div>
                      </div>
                      
                      {errors.violations && (
                        <span className="text-red-400 text-sm flex items-center gap-1 mt-2">
                          <AlertCircle size={14} />
                          {errors.violations.message}
                        </span>
                      )}
                    </div>
                    
                    {/* Relación del incidente */}
                    <div className="bg-black/30 rounded-xl p-5 border border-gray-800">
                      <h4 className="text-lg font-medium text-gold mb-4 flex items-center gap-2">
                        <User size={18} />
                        Relación con el Incidente <span className="text-red-400">*</span>
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className={`border border-gray-700 rounded-lg p-4 flex items-center gap-3 cursor-pointer transition-colors ${watch("incidentRelation") === "Víctima" ? "bg-yellow-500/10 border-yellow-500/40" : "hover:bg-black/40"}`}>
                          <input
                            type="radio"
                            id="victim"
                            value="Víctima"
                            className="hidden"
                            {...register("incidentRelation", { required: "Debe seleccionar una opción" })}
                          />
                          <label className="cursor-pointer flex items-center gap-3 w-full" htmlFor="victim">
                            <div className={`w-5 h-5 rounded-full border ${watch("incidentRelation") === "Víctima" ? "border-yellow-500 flex items-center justify-center" : "border-gray-500"}`}>
                              {watch("incidentRelation") === "Víctima" && <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>}
                            </div>
                            <span className="text-white">Víctima</span>
                          </label>
                        </div>
                        
                        <div className={`border border-gray-700 rounded-lg p-4 flex items-center gap-3 cursor-pointer transition-colors ${watch("incidentRelation") === "Testigo" ? "bg-yellow-500/10 border-yellow-500/40" : "hover:bg-black/40"}`}>
                          <input
                            type="radio"
                            id="witness"
                            value="Testigo"
                            className="hidden"
                            {...register("incidentRelation")}
                          />
                          <label className="cursor-pointer flex items-center gap-3 w-full" htmlFor="witness">
                            <div className={`w-5 h-5 rounded-full border ${watch("incidentRelation") === "Testigo" ? "border-yellow-500 flex items-center justify-center" : "border-gray-500"}`}>
                              {watch("incidentRelation") === "Testigo" && <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>}
                            </div>
                            <span className="text-white">Testigo</span>
                          </label>
                        </div>
                      </div>
                      
                      {errors.incidentRelation && (
                        <span className="text-red-400 text-sm flex items-center gap-1 mt-2">
                          <AlertCircle size={14} />
                          {errors.incidentRelation.message}
                        </span>
                      )}
                    </div>
                    
                    {/* Descripción */}
                    <div className="bg-black/30 rounded-xl p-5 border border-gray-800">
                      <h4 className="text-lg font-medium text-gold mb-4 flex items-center gap-2">
                        <Info size={18} />
                        Descripción del Incidente
                      </h4>
                      
                      <div>
                        <textarea
                          id="description"
                          rows="5"
                          className="w-full p-4 rounded-lg border border-gray-700 bg-black/50 text-white focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors resize-none"
                          placeholder="Describa detalladamente lo ocurrido (hora, lugar, circunstancias)"
                          {...register("description")}
                        ></textarea>
                        <p className="text-gray-500 text-sm mt-2">La descripción detallada nos ayuda a procesar su denuncia con mayor precisión.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Botón de envío */}
                <div className="mt-8 flex justify-center w-full">
                  <button
                    type="submit"
                    className={`px-8 py-4 w-full text-center rounded-xl text-white font-semibold flex items-center gap-2 transition-colors ${
                      submitting 
                        ? "bg-gray-600 cursor-not-allowed" 
                        : "bg-gradient-to-r from-yellow-600 to-yellow-800 hover:from-yellow-500 hover:to-yellow-700"
                    }`}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin  rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Enviar Denuncia</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Info className="text-yellow-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h5 className="text-white font-medium mb-1">Información Importante</h5>
                  <p className="text-gray-400 text-sm">Su denuncia será procesada por nuestro equipo de atención al usuario. Las denuncias son tratadas de manera confidencial y se tomarán acciones correspondientes según la gravedad del caso.</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default FormularioDenuncia;
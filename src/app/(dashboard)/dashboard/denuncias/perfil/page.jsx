'use client';
import React, { useEffect, useState } from 'react';
import { User, Mail, Phone, Calendar, MapPin, IdCard, Image, Gender, CheckCircle, XCircle, Clock } from 'lucide-react';

const PassengerAccount = () => {
  const [passengerData, setPassengerData] = useState(null);

  useEffect(() => {
    const fetchPassengerData = async () => {
      try {
        const response = await fetch('/api/dashboard/passenger/1');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPassengerData(data);
      } catch (error) {
        console.error('Error fetching passenger data:', error);
      }
    };

    fetchPassengerData();
  }, []);

  if (!passengerData) {
    return (
      <div className="bg-dark p-8 rounded-2xl border border-gold/20 text-white flex justify-center items-center">
        Cargando...
      </div>
    );
  }

  return (
    <div className="bg-dark/80 rounded-2xl border border-gold/20 shadow-lg transition-all overflow-hidden hover:scale-[1.02] p-6">
      <h2 className="text-3xl font-bold text-gold mb-8 flex items-center">
        <User className="mr-4" />
        Cuenta de Pasajero
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Información Personal */}
        <div>
          <h3 className="text-xl font-semibold text-gold mb-4">Información Personal</h3>
          <div className="space-y-4">
            <div className="flex items-center bg-black/30 p-4 rounded-2xl border border-gray-800">
              <span className="text-gold mr-4">Nombre:</span>
              <span className="ml-2">{passengerData.firstName} {passengerData.lastName}</span>
            </div>
            <div className="flex items-center bg-black/30 p-4 rounded-2xl border border-gray-800">
              <Mail className="text-gold mr-4" />
              <span className="font-semibold">Email:</span>
              <span className="ml-2">{passengerData.email}</span>
            </div>
            {passengerData.phone && (
              <div className="flex items-center bg-black/30 p-4 rounded-2xl border border-gray-800">
                <Phone className="text-gold mr-4" />
                <span className="font-semibold">Teléfono:</span>
                <span className="ml-2">{passengerData.phone}</span>
              </div>
            )}
            {passengerData.birthDate && (
              <div className="flex items-center bg-black/30 p-4 rounded-2xl border border-gray-800">
                <Calendar className="text-gold mr-4" />
                <span className="font-semibold">Fecha de Nacimiento:</span>
                <span className="ml-2">
                  {passengerData.birthDate ? new Date(passengerData.birthDate).toLocaleDateString() : 'No especificado'}
                </span>
              </div>
            )}
            {passengerData.gender && (
              <div className="flex items-center bg-black/30 p-4 rounded-2xl border border-gray-800">
                <Gender className="text-gold mr-4" />
                <span className="font-semibold">Género:</span>
                <span className="ml-2">{passengerData.gender}</span>
              </div>
            )}
            {passengerData.address && (
              <div className="flex items-center bg-black/30 p-4 rounded-2xl border border-gray-800">
                <MapPin className="text-gold mr-4" />
                <span className="font-semibold">Dirección:</span>
                <span className="ml-2">{passengerData.address}</span>
              </div>
            )}
          </div>
        </div>
        {/* Información de la Cuenta */}
        <div>
          <h3 className="text-xl font-semibold text-gold mb-4">Información de la Cuenta</h3>
          <div className="space-y-4">
            <div className="flex items-center bg-black/30 p-4 rounded-2xl border border-gray-800">
              <span className="text-gold mr-4">Contraseña:</span>
              <span className="ml-2">{'********'}</span>
            </div>
            {passengerData.CI && (
              <div className="flex items-center bg-black/30 p-4 rounded-2xl border border-gray-800">
                <IdCard className="text-gold mr-4" />
                <span className="font-semibold">CI:</span>
                <span className="ml-2">{passengerData.CI}</span>
              </div>
            )}
            {passengerData.profileImage && (
              <div className="flex items-center bg-black/30 p-4 rounded-2xl border border-gray-800">
                <Image className="text-gold mr-4" />
                <span className="font-semibold">Imagen de Perfil:</span>
                <span className="ml-2">{passengerData.profileImage}</span>
              </div>
            )}
            <div className="flex items-center bg-black/30 p-4 rounded-2xl border border-gray-800">
              <span className="text-gold mr-4">Estado:</span>
              <span className="ml-2">{passengerData.status ? <CheckCircle className="inline-block text-green-400"/> : <XCircle className="inline-block text-red-400"/>}</span>
            </div>
            <div className="flex items-center bg-black/30 p-4 rounded-2xl border border-gray-800">
              <Clock className="text-gold mr-4" />
              <span className="font-semibold">Creado:</span>
              <span className="ml-2">
                {new Date(passengerData.createdAt).toLocaleDateString()}
              </span>
            </div>
            {passengerData.updatedAt &&(
              <div className="flex items-center bg-black/30 p-4 rounded-2xl border border-gray-800">
                <Clock className="text-gold mr-4" />
                <span className="font-semibold">Actualizado:</span>
                <span className="ml-2">
                  {new Date(passengerData.updatedAt).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerAccount;
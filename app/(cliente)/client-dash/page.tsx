'use client';
import Link from 'next/link';
import { useState } from 'react';

interface Service {
  id: string;
  placa: string;
  marca: string;
  cliente: string;
  servicio: string;
  status: 'LAVADO' | 'ASPIRADO' | 'SECADO' | 'FINALIZADO';
  cancelado: 'NO' | 'SI';
}

export default function ServiciosPage() {
  const [turno, setTurno] = useState('Today');
  const [prioridad, setPrioridad] = useState('20');

  const servicios: Service[] = [
    {
      id: 'A5K345P',
      placa: 'A5K345P',
      marca: 'FORD-FUSION',
      cliente: 'MARCO COBO',
      servicio: 'FULL - $20',
      status: 'LAVADO',
      cancelado: 'NO',
    },
    {
      id: 'JJK34OE',
      placa: 'JJK34OE',
      marca: 'FORD-FUSION',
      cliente: 'MARCELA PAYARES',
      servicio: 'FULL - $20',
      status: 'ASPIRADO',
      cancelado: 'SI',
    },
    {
      id: '3INM02Q',
      placa: '3INM02Q',
      marca: 'FORD-FIESTA',
      cliente: 'LUIS PEREZ',
      servicio: 'FULL - $20',
      status: 'SECADO',
      cancelado: 'NO',
    },
    {
      id: 'BYT3535',
      placa: 'BYT3535',
      marca: 'FORD-EXPLORER',
      cliente: 'JOSE DIAZ',
      servicio: 'FULL - $20',
      status: 'FINALIZADO',
      cancelado: 'SI',
    },
  ];

  const getStatusStyles = (status: Service['status']) => {
    const styles = {
      LAVADO: 'bg-blue-500 text-white',
      ASPIRADO: 'bg-amber-600 text-white',
      SECADO: 'bg-blue-500 text-white',
      FINALIZADO: 'bg-green-500 text-white',
    };
    return styles[status];
  };

  const getCanceladoStyles = (cancelado: 'NO' | 'SI') => {
    return cancelado === 'NO'
      ? 'bg-red-500 text-white' 
      : 'bg-green-500 text-white';
  };

  return (
    <div className="min-h-screen  ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-1">Servicios</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a5490]">Servicios</h1>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4 min-w-[160px]">
            <div className="flex items-center gap-3">
              <div className="text-[#1a5490]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Turno</p>
                <select 
                  value={turno}
                  onChange={(e) => setTurno(e.target.value)}
                  className="font-semibold text-gray-800 bg-transparent border-none outline-none cursor-pointer"
                >
                  <option>Today</option>
                  <option>Tomorrow</option>
                  <option>This Week</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4 min-w-[160px]">
            <div className="flex items-center gap-3">
              <div className="text-[#1a5490]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Prioridad</p>
                <select 
                  value={prioridad}
                  onChange={(e) => setPrioridad(e.target.value)}
                  className="font-semibold text-gray-800 bg-transparent border-none outline-none cursor-pointer"
                >
                  <option>20</option>
                  <option>10</option>
                  <option>30</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Services Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-[#1a5490] mb-6">Servicios Activos</h2>
            
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Placa</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Marca-Modelo</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Cliente</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Servicios</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Cancelado</th>
                  </tr>
                </thead>
                <tbody>
                  {servicios.map((servicio) => (
                    <tr key={servicio.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <Link 
                          href={`client-dash/${servicio.id}`}
                          className="text-[#1a5490] font-semibold hover:underline"
                        >
                          {servicio.placa}
                        </Link>
                      </td>
                      <td className="py-4 px-4 text-gray-700 font-medium">
                        {servicio.marca}
                      </td>
                      <td className="py-4 px-4 text-gray-700 font-medium">
                        {servicio.cliente}
                      </td>
                      <td className="py-4 px-4 text-gray-700">
                        {servicio.servicio}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${getStatusStyles(servicio.status)}`}>
                          {servicio.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-6 py-1.5 rounded-full text-sm font-semibold ${getCanceladoStyles(servicio.cancelado)}`}>
                          {servicio.cancelado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
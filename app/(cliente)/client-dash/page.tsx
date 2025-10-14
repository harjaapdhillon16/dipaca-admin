'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { clientDashboardAPI } from '../../../lib/api';
import { useAuth } from '../../../hooks/useAuth';
import { useRouter } from 'next/navigation';

interface Service {
  id: string;
  placa: string;
  marca: string;
  modelo: string;
  cliente_nombre: string;
  cliente_apellido: string;
  tipo_servicio: string;
  monto: number;
  status: string;
  cancelado: boolean;
}

export default function ClientDashPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [turno, setTurno] = useState('Today');
  const [servicios, setServicios] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is a cliente
    if (user && user.rol !== 'cliente') {
      router.push('/home');
      return;
    }

    if (user && !user.cliente_id) {
      setError('Tu cuenta no está asociada a un cliente. Por favor contacta al administrador.');
      setLoading(false);
      return;
    }

    if (user) {
      fetchActiveServices();
    }
  }, [user, turno]);

  const fetchActiveServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await clientDashboardAPI.getActiveServices(turno);
      setServicios(data);
    } catch (err: any) {
      console.error('Error fetching active services:', err);
      
      // Handle specific error cases
      if (err.message.includes('not associated with a cliente')) {
        setError('Tu cuenta no está vinculada a un cliente. Contacta al administrador para obtener ayuda.');
      } else if (err.message.includes('Invalid or expired token')) {
        setError('Tu sesión ha expirado. Por favor inicia sesión nuevamente.');
        setTimeout(() => router.push('/login'), 2000);
      } else {
        setError(err.message || 'Error al cargar servicios');
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyles = (status: string) => {
    const statusUpper = status.toUpperCase();
    const styles: Record<string, string> = {
      LAVADO: 'bg-blue-500 text-white',
      ASPIRADO: 'bg-amber-600 text-white',
      SECADO: 'bg-blue-500 text-white',
      FINALIZADO: 'bg-green-500 text-white',
      PENDIENTE: 'bg-yellow-500 text-white',
      EN_PROCESO: 'bg-blue-600 text-white',
    };
    return styles[statusUpper] || 'bg-gray-500 text-white';
  };

  const getCanceladoStyles = (cancelado: boolean) => {
    return cancelado
      ? 'bg-green-500 text-white' 
      : 'bg-red-500 text-white';
  };

  // Calculate priority based on number of active services
  const prioridad = servicios.length;

  // Show loading while checking user
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a5490] mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando usuario...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-1">Servicios</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a5490]">
            Mis Servicios
            {user && <span className="text-xl ml-2 text-gray-600">- {user.nombre}</span>}
          </h1>
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
                  className="font-semibold text-gray-800 bg-transparent border-none outline-none cursor-pointer w-full"
                  disabled={loading}
                >
                  <option value="Today">Hoy</option>
                  <option value="Tomorrow">Mañana</option>
                  <option value="This Week">Esta Semana</option>
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
                <p className="text-xs text-gray-500">En Cola</p>
                <div className="font-semibold text-gray-800">
                  {prioridad}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-[#1a5490] mb-6">Servicios Activos</h2>
            
            {/* Loading State */}
            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a5490] mx-auto"></div>
                <p className="mt-4 text-gray-600">Cargando servicios...</p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-4">
                  <p className="text-red-600 mb-2 font-semibold">Error</p>
                  <p className="text-red-700">{error}</p>
                </div>
                {!error.includes('no está vinculada') && (
                  <button 
                    onClick={fetchActiveServices}
                    className="px-4 py-2 bg-[#1a5490] text-white rounded-lg hover:bg-[#144070]"
                  >
                    Reintentar
                  </button>
                )}
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && servicios.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No tienes servicios activos para {turno === 'Today' ? 'hoy' : turno === 'Tomorrow' ? 'mañana' : 'esta semana'}
              </div>
            )}

            {/* Table */}
            {!loading && !error && servicios.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Placa</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Marca-Modelo</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Servicios</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Pagado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {servicios.map((servicio) => (
                      <tr key={servicio.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <Link 
                            href={`/client-dash/${servicio.id}`}
                            className="text-[#1a5490] font-semibold hover:underline"
                          >
                            {servicio.placa || 'N/A'}
                          </Link>
                        </td>
                        <td className="py-4 px-4 text-gray-700 font-medium">
                          {servicio.marca} {servicio.modelo}
                        </td>
                        <td className="py-4 px-4 text-gray-700">
                          {servicio.tipo_servicio} - ${servicio.monto}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${getStatusStyles(servicio.status)}`}>
                            {servicio.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-6 py-1.5 rounded-full text-sm font-semibold ${getCanceladoStyles(servicio.cancelado)}`}>
                            {servicio.cancelado ? 'SI' : 'NO'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info Section */}
    
      </div>
    </div>
  );
}
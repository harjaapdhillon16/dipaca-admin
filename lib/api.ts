const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dipaca-server-production.up.railway.app/api';

// Helper function to get auth token
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Helper function to create headers
const getHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Generic API call handler
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...getHeaders(),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Trabajadores API
export const trabajadoresAPI = {
  getAll: (search?: string) => {
    const params = search ? `?search=${encodeURIComponent(search)}` : '';
    return apiCall<any[]>(`/trabajadores${params}`);
  },

  getById: (id: string) => {
    return apiCall<any>(`/trabajadores/${id}`);
  },

  create: (data: any) => {
    return apiCall<any>('/trabajadores', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: (id: string, data: any) => {
    return apiCall<any>(`/trabajadores/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: (id: string) => {
    return apiCall<any>(`/trabajadores/${id}`, {
      method: 'DELETE',
    });
  },

  getStats: () => {
    return apiCall<{ total: number }>('/trabajadores/stats');
  },
};

// Clientes API
export const clientesAPI = {
  getAll: (search?: string) => {
    const params = search ? `?search=${encodeURIComponent(search)}` : '';
    return apiCall<any[]>(`/clientes${params}`);
  },

  getById: (id: string) => {
    return apiCall<any>(`/clientes/${id}`);
  },

  create: (data: any) => {
    return apiCall<any>('/clientes', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: (id: string, data: any) => {
    return apiCall<any>(`/clientes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: (id: string) => {
    return apiCall<any>(`/clientes/${id}`, {
      method: 'DELETE',
    });
  },

  getStats: () => {
    return apiCall<{ total: number }>('/clientes/stats');
  },
};

// Auth API
export const authAPI = {
  login: (email: string, password: string) => {
    return apiCall<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: (data: any) => {
    return apiCall<any>('/auth/register-cliente', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  verifyToken: () => {
    return apiCall<{ user: any }>('/auth/verify');
  },
};

// Vehiculos API
export const vehiculosAPI = {
  getAll: (search?: string) => {
    const params = search ? `?search=${encodeURIComponent(search)}` : '';
    return apiCall<any[]>(`/vehiculos${params}`);
  },

  getById: (id: string) => {
    return apiCall<any>(`/vehiculos/${id}`);
  },

  create: (data: any) => {
    return apiCall<any>('/vehiculos', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: (id: string, data: any) => {
    return apiCall<any>(`/vehiculos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: (id: string) => {
    return apiCall<any>(`/vehiculos/${id}`, {
      method: 'DELETE',
    });
  },

  getStats: () => {
    return apiCall<{ total: number }>('/vehiculos/stats');
  },
};

// Servicios API
export const serviciosAPI = {
  getAll: (filters?: any) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key]) params.append(key, filters[key]);
      });
    }
    const queryString = params.toString();
    return apiCall<any[]>(`/servicios${queryString ? `?${queryString}` : ''}`);
  },

  getById: (id: string) => {
    return apiCall<any>(`/servicios/${id}`);
  },

  create: (data: any) => {
    return apiCall<any>('/servicios', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: (id: string, data: any) => {
    return apiCall<any>(`/servicios/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: (id: string) => {
    return apiCall<any>(`/servicios/${id}`, {
      method: 'DELETE',
    });
  },

  getStats: () => {
    return apiCall<any>('/servicios/stats');
  },
};

// Todos API
export const todosAPI = {
  getByServicio: (servicioId: string) => {
    return apiCall<any[]>(`/todos/servicio/${servicioId}`);
  },

  create: (servicioId: string, data: { text: string; done?: boolean }) => {
    return apiCall<any>(`/todos/servicio/${servicioId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: (id: string, data: { text: string; done: boolean }) => {
    return apiCall<any>(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  toggle: (id: string) => {
    return apiCall<any>(`/todos/${id}/toggle`, {
      method: 'PATCH',
    });
  },

  delete: (id: string) => {
    return apiCall<any>(`/todos/${id}`, {
      method: 'DELETE',
    });
  },
};

// Dashboard API
export const dashboardAPI = {
  getStats: (period: string = 'week') => {
    return apiCall<any>(`/dashboard/stats?period=${period}`);
  },

  getMonthlyIncome: () => {
    return apiCall<any[]>('/dashboard/monthly-income');
  },

  getWorkerRanking: (period: string = 'month', limit: number = 10) => {
    return apiCall<any[]>(`/dashboard/worker-ranking?period=${period}&limit=${limit}`);
  },

  getIncomeByService: (period: string = 'month') => {
    return apiCall<any[]>(`/dashboard/income-by-service?period=${period}`);
  },

  getIncomeByPayment: (period: string = 'month') => {
    return apiCall<any[]>(`/dashboard/income-by-payment?period=${period}`);
  },
};

// Client Dashboard API
export const clientDashboardAPI = {
  getDashboard: () => {
    return apiCall<any>('/client/dashboard');
  },

  getActiveServices: (turno?: string) => {
    const params = turno ? `?turno=${turno}` : '';
    return apiCall<any[]>(`/client/active-services${params}`);
  },

  getMyInfo: () => {
    return apiCall<any>('/client/info');
  },

  getMyServices: (status?: string) => {
    const params = status ? `?status=${status}` : '';
    return apiCall<any[]>(`/client/services${params}`);
  },

  getMyVehicles: () => {
    return apiCall<any[]>('/client/vehicles');
  },

  updateProfile: (data: { telefono: string; correo: string }) => {
    return apiCall<any>('/client/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

// Service Items API
export const servicioItemsAPI = {
  getCatalogo: () => {
    return apiCall<any[]>('/servicio-items/catalogo');
  },

  getItems: (servicioId: string) => {
    return apiCall<any[]>(`/servicio-items/${servicioId}/items`);
  },

  addItem: (servicioId: string, data: { nombre: string; precio: number }) => {
    return apiCall<any>(`/servicio-items/${servicioId}/items`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  removeItem: (itemId: string) => {
    return apiCall<any>(`/servicio-items/items/${itemId}`, {
      method: 'DELETE',
    });
  },

  applyDiscount: (servicioId: string, data: { puntos_usados: number; descuento: number }) => {
    return apiCall<any>(`/servicio-items/${servicioId}/discount`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  processPayment: (servicioId: string, data: { metodo_pago: string; propina: number }) => {
    return apiCall<any>(`/servicio-items/${servicioId}/payment`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

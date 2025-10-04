export type Servicio = {
  id: string
  fecha: string
  placa: string
  marca: string
  modelo: string
  cliente: string
  tipo: string
  monto: string
  status?: "LAVADO" | "ASPIRADO" | "SECADO" | "FINALIZADO"
  cancelado?: "SI" | "NO"
}

export const servicios: Servicio[] = [
  {
    id: "1",
    fecha: "20/05/2025",
    placa: "AGK345P",
    marca: "FORD",
    modelo: "FUSION",
    cliente: "MARCO COBO",
    tipo: "FULL",
    monto: "$20",
    status: "LAVADO",
    cancelado: "NO",
  },
  {
    id: "2",
    fecha: "20/05/2025",
    placa: "JJK340E",
    marca: "FORD",
    modelo: "FUSION",
    cliente: "MARCELA PAYARES",
    tipo: "FULL",
    monto: "$20",
    status: "ASPIRADO",
    cancelado: "SI",
  },
  {
    id: "3",
    fecha: "20/05/2025",
    placa: "3INMD2Q",
    marca: "FORD",
    modelo: "FIESTA",
    cliente: "LUIS PEREZ",
    tipo: "FULL",
    monto: "$20",
    status: "SECADO",
    cancelado: "NO",
  },
  {
    id: "4",
    fecha: "19/05/2025",
    placa: "BYT3535",
    marca: "FORD",
    modelo: "EXPLORER",
    cliente: "JOSE DIAZ",
    tipo: "FULL",
    monto: "$20",
    status: "FINALIZADO",
    cancelado: "SI",
  },
]

export const clientes = [
  { ci: "27456223", nombre: "MARCO", apellido: "COBO", telefono: "04132452904", correo: "marcocobo@gmail.com" },
  { ci: "30998763", nombre: "JOSE", apellido: "NIEVES", telefono: "04246578972", correo: "josenieves25@gmail.com" },
  { ci: "23445012", nombre: "FELIX", apellido: "DIAZ", telefono: "0416324342", correo: "felixdiez@gmail.com" },
  { ci: "8907632", nombre: "LEONARDO", apellido: "SANTANA", telefono: "04261112330", correo: "leosantana@gmail.com" },
]

export const trabajadores = [
  { ci: "30998763", nombre: "JOSE", apellido: "NIEVES", servicios: 15, cargo: "Cajero" },
  { ci: "27456223", nombre: "MARCO", apellido: "COBO", servicios: 8, cargo: "Lavador" },
  { ci: "23445012", nombre: "FELIX", apellido: "DIAZ", servicios: 12, cargo: "Supervisor" },
  { ci: "8907632", nombre: "LEONARDO", apellido: "SANTANA", servicios: 5, cargo: "Cajero" },
]

export const ranking = [
  { nombre: "Marco Cobo", servicios: 12 },
  { nombre: "Antonio Lemhus", servicios: 10 },
  { nombre: "Marcela Payares", servicios: 8 },
  { nombre: "Andres Arispe", servicios: 6 },
  { nombre: "Pedro Perez", servicios: 6 },
  { nombre: "Jose Rodríguez", servicios: 4 },
  { nombre: "Luis Diaz", servicios: 4 },
  { nombre: "Lionel Maldini", servicios: 1 },
]

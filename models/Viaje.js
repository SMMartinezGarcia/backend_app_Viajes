// ========================================
// MODELO ÚNICO: Viajes — Actualizado con imagen/estrellas
// ========================================
const mongoose = require('mongoose');

const VueloSchema = new mongoose.Schema({
  aerolinea: String,
  numeroVuelo: String,
  origen: String,
  destino: String,
  fechaSalida: Date,
  precio: Number,
  asientos: Number,
  imagen: String,      // URL de imagen del avión/destino
  duracion: String,    // ej. "2h 10m"
});

const HotelSchema = new mongoose.Schema({
  nombre: String,
  ciudad: String,
  habitacion: String,
  precioPorNoche: Number,
  disponible: Boolean,
  amenities: [String],
  imagen: String,      // URL de imagen del hotel
  estrellas: Number,   // 1–5
});

const ReservaSchema = new mongoose.Schema({
  usuarioId: String,
  usuarioEmail: String,
  usuarioNombre: String,
  vueloSeleccionado: VueloSchema,
  hotelSeleccionado: HotelSchema,
  noches: Number,
  total: Number,
  estado: {
    type: String,
    enum: ['pendiente', 'pagado', 'cancelado'],
    default: 'pendiente'
  },
  fechaReserva: { type: Date, default: Date.now }
});

module.exports = {
  Vuelo: mongoose.model('Vuelo', VueloSchema),
  Hotel: mongoose.model('Hotel', HotelSchema),
  Reserva: mongoose.model('Reserva', ReservaSchema)
};
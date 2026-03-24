// Modelo de ubicaciones (MEJORADO)
const mongoose = require('mongoose');

const UbicacionSchema = new mongoose.Schema({
  
  usuarioId: {
    type: String,  
    required: true
  },
  usuarioNombre: String,
  usuarioEmail: String,
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  lugar: String,  
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Ubicacion', UbicacionSchema);
// ========================================
// RUTAS ÚNICAS: Viajes
// ========================================
const express = require('express');
const router = express.Router();
const viajeController = require('../controllers/viajeController');

// Vuelos
router.get('/vuelos', viajeController.buscarVuelos);

// Hoteles
router.get('/hoteles', viajeController.buscarHoteles);

// Reservas
router.post('/reservas', viajeController.crearReserva);
router.get('/reservas', viajeController.obtenerReservas);

module.exports = router;
// ========================================
// CONTROLADOR ÚNICO: Viajes — Datos extendidos
// ========================================
const { Vuelo, Hotel, Reserva } = require('../models/Viaje');

exports.buscarVuelos = async (req, res) => {
  try {
    const { origen, destino } = req.query;
    let query = {};
    if (origen) query.origen = { $regex: origen, $options: 'i' };
    if (destino) query.destino = { $regex: destino, $options: 'i' };
    const vuelos = await Vuelo.find(query);
    res.json(vuelos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.buscarHoteles = async (req, res) => {
  try {
    const { ciudad } = req.query;
    let query = { disponible: true };
    if (ciudad) query.ciudad = { $regex: ciudad, $options: 'i' };
    const hoteles = await Hotel.find(query);
    res.json(hoteles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.crearReserva = async (req, res) => {
  try {
    const { usuario, vuelo, hotel, noches } = req.body;
    const total = (vuelo?.precio || 0) + ((hotel?.precioPorNoche || 0) * noches);
    const reserva = new Reserva({
      usuarioId: usuario.uid || usuario.id,
      usuarioEmail: usuario.email,
      usuarioNombre: usuario.displayName || usuario.nombre,
      vueloSeleccionado: vuelo,
      hotelSeleccionado: hotel,
      noches,
      total
    });
    await reserva.save();
    res.status(201).json(reserva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerReservas = async (req, res) => {
  try {
    const { usuarioId } = req.query;
    const reservas = await Reserva.find({ usuarioId }).sort({ fechaReserva: -1 });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===== DATOS DE EJEMPLO EXTENDIDOS =====
exports.crearDatosEjemplo = async () => {
  try {
    const vuelosCount = await Vuelo.countDocuments();
    const hotelesCount = await Hotel.countDocuments();

    if (vuelosCount === 0) {
      await Vuelo.insertMany([
        // ── CDMX → CUN ──
        { aerolinea: 'Aeroméxico', numeroVuelo: 'AM123', origen: 'CDMX', destino: 'CUN', fechaSalida: new Date('2026-04-10T08:00'), precio: 3200, asientos: 50, imagen: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80', duracion: '2h 10m' },
        { aerolinea: 'Volaris',    numeroVuelo: 'VO456', origen: 'CDMX', destino: 'CUN', fechaSalida: new Date('2026-04-10T14:00'), precio: 2900, asientos: 30, imagen: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=400&q=80', duracion: '2h 15m' },
        { aerolinea: 'Interjet',   numeroVuelo: 'IJ789', origen: 'CDMX', destino: 'CUN', fechaSalida: new Date('2026-04-11T06:30'), precio: 2600, asientos: 20, imagen: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=400&q=80', duracion: '2h 05m' },
        { aerolinea: 'VivaAerobus',numeroVuelo: 'VB321', origen: 'CDMX', destino: 'CUN', fechaSalida: new Date('2026-04-12T10:45'), precio: 2400, asientos: 40, imagen: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=400&q=80', duracion: '2h 20m' },

        // ── CDMX → GDL ──
        { aerolinea: 'Aeroméxico', numeroVuelo: 'AM201', origen: 'CDMX', destino: 'GDL', fechaSalida: new Date('2026-04-10T09:00'), precio: 1800, asientos: 60, imagen: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80', duracion: '1h 05m' },
        { aerolinea: 'Volaris',    numeroVuelo: 'VO202', origen: 'CDMX', destino: 'GDL', fechaSalida: new Date('2026-04-10T17:30'), precio: 1500, asientos: 35, imagen: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=400&q=80', duracion: '1h 10m' },

        // ── CDMX → MTY ──
        { aerolinea: 'VivaAerobus',numeroVuelo: 'VB303', origen: 'CDMX', destino: 'MTY', fechaSalida: new Date('2026-04-11T12:00'), precio: 2100, asientos: 45, imagen: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=400&q=80', duracion: '1h 30m' },
        { aerolinea: 'Aeroméxico', numeroVuelo: 'AM304', origen: 'CDMX', destino: 'MTY', fechaSalida: new Date('2026-04-11T07:15'), precio: 2300, asientos: 55, imagen: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=400&q=80', duracion: '1h 25m' },

        // ── CDMX → OAX ──
        { aerolinea: 'Aeroméxico', numeroVuelo: 'AM405', origen: 'CDMX', destino: 'OAX', fechaSalida: new Date('2026-04-12T08:30'), precio: 1900, asientos: 25, imagen: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80', duracion: '1h 15m' },
        { aerolinea: 'Volaris',    numeroVuelo: 'VO406', origen: 'CDMX', destino: 'OAX', fechaSalida: new Date('2026-04-13T16:00'), precio: 1650, asientos: 30, imagen: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=400&q=80', duracion: '1h 20m' },

        // ── CDMX → PVR ──
        { aerolinea: 'Aeroméxico', numeroVuelo: 'AM507', origen: 'CDMX', destino: 'PVR', fechaSalida: new Date('2026-04-14T11:00'), precio: 2700, asientos: 50, imagen: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=400&q=80', duracion: '1h 45m' },
        { aerolinea: 'VivaAerobus',numeroVuelo: 'VB508', origen: 'CDMX', destino: 'PVR', fechaSalida: new Date('2026-04-14T15:30'), precio: 2350, asientos: 40, imagen: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=400&q=80', duracion: '1h 50m' },

        // ── CDMX → MID ──
        { aerolinea: 'Aeroméxico', numeroVuelo: 'AM609', origen: 'CDMX', destino: 'MID', fechaSalida: new Date('2026-04-15T09:45'), precio: 2200, asientos: 35, imagen: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80', duracion: '1h 35m' },

        // ── GDL → CUN ──
        { aerolinea: 'Volaris',    numeroVuelo: 'VO701', origen: 'GDL',  destino: 'CUN', fechaSalida: new Date('2026-04-16T07:00'), precio: 2800, asientos: 30, imagen: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=400&q=80', duracion: '2h 30m' },
        { aerolinea: 'Aeroméxico', numeroVuelo: 'AM702', origen: 'GDL',  destino: 'CUN', fechaSalida: new Date('2026-04-16T14:00'), precio: 3100, asientos: 45, imagen: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=400&q=80', duracion: '2h 25m' },

        // ── MTY → CUN ──
        { aerolinea: 'VivaAerobus',numeroVuelo: 'VB801', origen: 'MTY',  destino: 'CUN', fechaSalida: new Date('2026-04-17T10:00'), precio: 2950, asientos: 25, imagen: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=400&q=80', duracion: '2h 00m' },
        { aerolinea: 'Aeroméxico', numeroVuelo: 'AM802', origen: 'MTY',  destino: 'CUN', fechaSalida: new Date('2026-04-18T08:30'), precio: 3300, asientos: 50, imagen: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80', duracion: '1h 55m' },

        // ── TIJ → CDMX ──
        { aerolinea: 'Volaris',    numeroVuelo: 'VO901', origen: 'TIJ',  destino: 'CDMX', fechaSalida: new Date('2026-04-19T06:00'), precio: 3500, asientos: 40, imagen: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=400&q=80', duracion: '3h 10m' },
        { aerolinea: 'Aeroméxico', numeroVuelo: 'AM902', origen: 'TIJ',  destino: 'CDMX', fechaSalida: new Date('2026-04-19T12:00'), precio: 3800, asientos: 35, imagen: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=400&q=80', duracion: '3h 05m' },
      ]);
      console.log('✅ Vuelos de ejemplo creados (20 vuelos)');
    }

    if (hotelesCount === 0) {
      await Hotel.insertMany([
        // ── CANCÚN ──
        { nombre: 'Hilton Cancún', ciudad: 'CUN', habitacion: 'Suite Océano', precioPorNoche: 4200, disponible: true, amenities: ['Piscina Infinity', 'Spa 5★', 'WiFi', 'Gym', 'All Inclusive'], imagen: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80', estrellas: 5 },
        { nombre: 'Fiesta Inn Cancún', ciudad: 'CUN', habitacion: 'Doble Estándar', precioPorNoche: 1900, disponible: true, amenities: ['WiFi', 'Estacionamiento', 'Desayuno'], imagen: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80', estrellas: 3 },
        { nombre: 'Hotel Xcaret México', ciudad: 'CUN', habitacion: 'Jungle Suite', precioPorNoche: 5800, disponible: true, amenities: ['Todo Incluido', 'Parques Xcaret', 'Spa', 'Piscinas'], imagen: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80', estrellas: 5 },
        { nombre: 'Grand Hyatt Cancún', ciudad: 'CUN', habitacion: 'Vista al Mar', precioPorNoche: 3600, disponible: true, amenities: ['Playa Privada', 'Piscina', 'Bar', 'WiFi'], imagen: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80', estrellas: 5 },
        { nombre: 'B2B Malecon Hotel', ciudad: 'CUN', habitacion: 'Individual', precioPorNoche: 1200, disponible: true, amenities: ['WiFi', 'Desayuno', 'AC'], imagen: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=400&q=80', estrellas: 3 },
        { nombre: 'Royalton Riviera Cancún', ciudad: 'CUN', habitacion: 'Diamond Club Suite', precioPorNoche: 6500, disponible: true, amenities: ['Butler', 'Playa', 'Spa', 'All Inclusive', 'Golf'], imagen: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80', estrellas: 5 },

        // ── GUADALAJARA ──
        { nombre: 'Camino Real Guadalajara', ciudad: 'GDL', habitacion: 'Junior Suite', precioPorNoche: 2800, disponible: true, amenities: ['Piscina', 'Restaurante', 'WiFi', 'Gym'], imagen: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80', estrellas: 5 },
        { nombre: 'Hampton Inn GDL', ciudad: 'GDL', habitacion: 'King Room', precioPorNoche: 1500, disponible: true, amenities: ['Desayuno', 'WiFi', 'Gym', 'Estacionamiento'], imagen: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80', estrellas: 3 },
        { nombre: 'Presidente InterContinental GDL', ciudad: 'GDL', habitacion: 'Club Room', precioPorNoche: 3200, disponible: true, amenities: ['Spa', 'Piscina', 'WiFi', 'Bar', 'Restaurante'], imagen: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80', estrellas: 5 },

        // ── MONTERREY ──
        { nombre: 'Safi Royal Luxury Valle MTY', ciudad: 'MTY', habitacion: 'Deluxe Suite', precioPorNoche: 3500, disponible: true, amenities: ['Spa', 'Rooftop Pool', 'WiFi', 'Concierge'], imagen: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=400&q=80', estrellas: 5 },
        { nombre: 'Holiday Inn Monterrey', ciudad: 'MTY', habitacion: 'Estándar', precioPorNoche: 1800, disponible: true, amenities: ['Desayuno', 'WiFi', 'Gym', 'Business Center'], imagen: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80', estrellas: 4 },
        { nombre: 'Fiesta Americana Monterrey', ciudad: 'MTY', habitacion: 'Vista Ciudad', precioPorNoche: 2400, disponible: true, amenities: ['Restaurante', 'Bar', 'Spa', 'WiFi'], imagen: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80', estrellas: 5 },

        // ── OAXACA ──
        { nombre: 'Casa Oaxaca Hotel', ciudad: 'OAX', habitacion: 'Suite Colonial', precioPorNoche: 2200, disponible: true, amenities: ['Rooftop', 'Restaurante Gourmet', 'WiFi', 'Arte Local'], imagen: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80', estrellas: 5 },
        { nombre: 'Hostal de la Noria', ciudad: 'OAX', habitacion: 'Doble Jardín', precioPorNoche: 1100, disponible: true, amenities: ['Desayuno', 'WiFi', 'Jardín', 'Terraza'], imagen: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80', estrellas: 3 },

        // ── PUERTO VALLARTA ──
        { nombre: 'Marriott Puerto Vallarta', ciudad: 'PVR', habitacion: 'Ocean Front Suite', precioPorNoche: 4800, disponible: true, amenities: ['Playa Privada', 'Piscina', 'Spa', 'All Inclusive'], imagen: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=400&q=80', estrellas: 5 },
        { nombre: 'Casa Velas Boutique', ciudad: 'PVR', habitacion: 'Suite Master', precioPorNoche: 5500, disponible: true, amenities: ['Todo Incluido', 'Golf', 'Spa', 'Butler', 'Club de Playa'], imagen: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80', estrellas: 5 },
        { nombre: 'Hacienda San Angel PVR', ciudad: 'PVR', habitacion: 'Suite Romántica', precioPorNoche: 3100, disponible: true, amenities: ['Vista Bahía', 'Desayuno', 'WiFi', 'Piscinas'], imagen: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80', estrellas: 4 },

        // ── MÉRIDA ──
        { nombre: 'Hyatt Regency Mérida', ciudad: 'MID', habitacion: 'King Suite', precioPorNoche: 2600, disponible: true, amenities: ['Piscina', 'Spa', 'Gym', 'WiFi', 'Restaurante'], imagen: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80', estrellas: 5 },
        { nombre: 'Hotel Julamis Mérida', ciudad: 'MID', habitacion: 'Habitación Colonial', precioPorNoche: 900, disponible: true, amenities: ['Cenote Privado', 'Desayuno', 'WiFi'], imagen: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80', estrellas: 3 },

        // ── TIJUANA ──
        { nombre: 'Grand Hotel Tijuana', ciudad: 'TIJ', habitacion: 'Suite Ejecutiva', precioPorNoche: 2000, disponible: true, amenities: ['Piscina', 'Restaurante', 'WiFi', 'Business Center'], imagen: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=400&q=80', estrellas: 4 },
        { nombre: 'Hotel Ticuán Tijuana', ciudad: 'TIJ', habitacion: 'Estándar', precioPorNoche: 800, disponible: true, amenities: ['WiFi', 'Desayuno', 'Estacionamiento'], imagen: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80', estrellas: 3 },
      ]);
      console.log('✅ Hoteles de ejemplo creados (20 hoteles)');
    }
  } catch (error) {
    console.error('Error al crear datos:', error);
  }
};
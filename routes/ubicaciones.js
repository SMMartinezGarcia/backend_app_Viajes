const express = require('express');
const router = express.Router();  
const Ubicacion = require('../models/Ubicacion');

// Guardar ubicación
router.post('/', async (req, res) => {
  try {
    const { usuarioId, usuarioNombre, usuarioEmail, lat, lng, lugar } = req.body;
    
    const nueva = new Ubicacion({
      usuarioId,
      usuarioNombre,
      usuarioEmail,
      lat,
      lng,
      lugar: lugar || ''
    });

    await nueva.save();
    res.status(201).json({ mensaje: 'Ubicación guardada', ubicacion: nueva });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const { usuarioId } = req.query;
    const ubicaciones = await Ubicacion.find({ usuarioId }).sort({ fecha: -1 });
    res.json(ubicaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { usuarioId } = req.query;
    
    const ubicacion = await Ubicacion.findOne({ _id: id, usuarioId });
    if (!ubicacion) {
      return res.status(404).json({ error: 'No encontrada' });
    }
    
    await ubicacion.deleteOne();
    res.json({ mensaje: 'Eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 
// server/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

router.post('/registro', async (req, res) => {
  try {
    const { nombre, email, password, telefono } = req.body;
    if (await Usuario.findOne({ email })) {
      return res.status(400).json({ error: 'Email ya registrado' });
    }
    const hash = await bcrypt.hash(password, 10);
    const usuario = new Usuario({ nombre, email, password: hash, telefono });
    await usuario.save();
    res.json({ mensaje: 'Registro exitoso', usuario: { id: usuario._id, nombre, email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
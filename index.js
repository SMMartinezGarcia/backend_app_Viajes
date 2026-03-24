require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const paymentsRouter = require('./routes/payments');
const ubicacionesRouter = require('./routes/ubicaciones');
const authRouter = require('./routes/auth');
const viajesRouter = require('./routes/viajes');  
const viajeController = require('./controllers/viajeController');  

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/payments', paymentsRouter);
app.use('/api/ubicaciones', ubicacionesRouter);
app.use('/api/auth', authRouter);
app.use('/api/viajes', viajesRouter);  

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', mensaje: 'Servidor funcionando' });
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    

    viajeController.crearDatosEjemplo();  
    
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Servidor en puerto ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => console.error('Error:', err));
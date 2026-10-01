const express = require('express');
const cors = require('cors');
require('dotenv').config();

const menuController = require('./controllers/menu.controller');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas/Endpoints
app.get('/api/menu', (req, res) => menuController.listar(req, res));
app.post('/api/menu', (req, res) => menuController.crear(req, res));

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Microservicio Menú corriendo en el puerto ${PORT}`);
});
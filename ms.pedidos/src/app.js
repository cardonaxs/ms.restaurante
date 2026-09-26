const express = require('express');
const pedidoRoutes = require('./routes/pedido.routes');

const app = express();
app.use(express.json());

app.use('/api/pedidos', pedidoRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`✅ Microservicio de Pedidos ejecutándose en el puerto ${PORT}`);
});
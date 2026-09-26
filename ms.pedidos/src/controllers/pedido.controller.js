const pedidoService = require('../services/pedido.service');

class PedidoController {
  async crear(req, res) {
    try {
      const clienteId = req.headers['x-user-id'] || 'CLI-TEMP-01';
      const pedido = await pedidoService.crearPedido(req.body, clienteId);
      res.status(201).json({ mensaje: "Pedido creado con éxito", pedido });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async obtenerTodos(req, res) {
    try {
      const pedidos = await pedidoService.obtenerPedidos();
      res.status(200).json(pedidos);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los pedidos" });
    }
  }

  async obtenerPorId(req, res) {
    try {
      const pedido = await pedidoService.obtenerPedidoPorId(req.params.id);
      res.status(200).json(pedido);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async actualizarEstado(req, res) {
    try {
      const { id } = req.params;
      const { estado } = req.body;
      const pedidoActualizado = await pedidoService.actualizarEstadoPedido(id, estado);
      res.status(200).json({ mensaje: "Estado del pedido actualizado", pedido: pedidoActualizado });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new PedidoController();
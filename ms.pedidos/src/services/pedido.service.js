const pedidoRepository = require('../repositories/pedido.repository');
const Pedido = require('../models/pedido.model');

class PedidoService {
  async crearPedido(datosPedido, clienteId) {
    if (!datosPedido.mesa) {
      throw new Error("El número de mesa es obligatorio.");
    }
    if (!datosPedido.items || datosPedido.items.length === 0) {
      throw new Error("El pedido debe contener al menos un ítem.");
    }

    // Cálculo del total de la orden
    const total = datosPedido.items.reduce((acc, item) => {
      return acc + (item.precio * item.cantidad);
    }, 0);

    const id = "PED-" + Date.now();
    const nuevoPedido = new Pedido(id, clienteId, datosPedido.mesa, datosPedido.items, total);

    return await pedidoRepository.guardar(nuevoPedido);
  }

  async obtenerPedidos() {
    return await pedidoRepository.obtenerTodos();
  }

  async obtenerPedidoPorId(id) {
    const pedido = await pedidoRepository.buscarPorId(id);
    if (!pedido) throw new Error("Pedido no encontrado.");
    return pedido;
  }

  async actualizarEstadoPedido(id, nuevoEstado) {
    const estadosValidos = ['pendiente', 'en_preparacion', 'listo', 'entregado'];
    if (!estadosValidos.includes(nuevoEstado)) {
      throw new Error(`Estado no válido. Permitiendo únicamente: ${estadosValidos.join(', ')}`);
    }

    const pedido = await pedidoRepository.buscarPorId(id);
    if (!pedido) throw new Error("Pedido no encontrado.");

    return await pedidoRepository.actualizarEstado(id, nuevoEstado);
  }
}

module.exports = new PedidoService();
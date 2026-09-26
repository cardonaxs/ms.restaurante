const pedidosBD = require('../database');

class PedidoRepository {
  async guardar(pedido) {
    pedidosBD.push(pedido);
    return pedido;
  }

  async obtenerTodos() {
    return pedidosBD;
  }

  async buscarPorId(id) {
    return pedidosBD.find(p => p.id === id);
  }

  async actualizarEstado(id, nuevoEstado) {
    const pedido = pedidosBD.find(p => p.id === id);
    if (pedido) {
      pedido.estado = nuevoEstado;
    }
    return pedido;
  }
}

module.exports = new PedidoRepository();
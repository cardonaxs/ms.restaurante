const pool = require('../database');

class PedidoRepository {
  // 1. Obtener todos los pedidos
  async obtenerTodos() {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query(
        'SELECT id, usuario_id, total, estado, created_at FROM pedidos ORDER BY created_at DESC'
      );
      return rows;
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }

  // 2. Obtener un pedido por su ID con sus detalles
  async obtenerPorId(id) {
    let conn;
    try {
      conn = await pool.getConnection();
      const pedidos = await conn.query('SELECT * FROM pedidos WHERE id = ?', [id]);
      if (pedidos.length === 0) return null;

      const pedido = pedidos[0];
      
      // Consultar los ítems o detalles del pedido
      const detalles = await conn.query(
        'SELECT id, producto_id, cantidad, precio_unitario, subtotal FROM detalles_pedido WHERE pedido_id = ?',
        [id]
      );

      pedido.detalles = detalles;
      return pedido;
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }

  // 3. Obtener pedidos realizados por un usuario específico
  async obtenerPorUsuario(usuarioId) {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query(
        'SELECT * FROM pedidos WHERE usuario_id = ? ORDER BY created_at DESC',
        [usuarioId]
      );
      return rows;
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }

  // 4. Crear un pedido con sus detalles (Uso de Transacción SQL)
  async crear(pedidoData) {
    let conn;
    const { usuario_id, total, detalles } = pedidoData;
    
    try {
      conn = await pool.getConnection();
      // Iniciar transacción para asegurar que se guarde el pedido y sus ítems juntos
      await conn.beginTransaction();

      // Insertar encabezado del pedido
      const resultPedido = await conn.query(
        'INSERT INTO pedidos (usuario_id, total, estado) VALUES (?, ?, ?)',
        [usuario_id, total, 'pendiente']
      );

      const pedidoId = Number(resultPedido.insertId);

      // Insertar cada detalle del pedido
      if (detalles && detalles.length > 0) {
        for (const item of detalles) {
          await conn.query(
            'INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)',
            [pedidoId, item.producto_id, item.cantidad, item.precio_unitario, item.cantidad * item.precio_unitario]
          );
        }
      }

      await conn.commit(); // Confirmar la transacción
      return { id: pedidoId, usuario_id, total, estado: 'pendiente' };
    } catch (error) {
      if (conn) await conn.rollback(); // Revertir cambios si hay error
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }

  // 5. Cambiar estado de un pedido (ej: 'pendiente', 'en_preparacion', 'entregado', 'cancelado')
  async cambiarEstado(id, estado) {
    let conn;
    try {
      conn = await pool.getConnection();
      const result = await conn.query(
        'UPDATE pedidos SET estado = ? WHERE id = ?',
        [estado, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }
}

module.exports = new PedidoRepository();
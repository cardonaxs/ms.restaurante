const db = require('../config/database');

class MenuRepository {
  async obtenerTodos() {
    const [rows] = await db.query('SELECT * FROM productos');
    return rows;
  }

  async crear(producto) {
    const { id, nombre, descripcion, precio, disponible, categoria_id } = producto;
    const [result] = await db.query(
      'INSERT INTO productos (id, nombre, descripcion, precio, disponible, categoria_id) VALUES (?, ?, ?, ?, ?, ?)',
      [id, nombre, descripcion, precio, disponible, categoria_id]
    );
    return result;
  }
}

module.exports = new MenuRepository();
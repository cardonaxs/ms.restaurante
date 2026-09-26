const pool = require('../database');

class UsuarioRepository {
  // 1. Obtener todos los usuarios
  async obtenerTodos() {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query('SELECT id, nombre, email, rol, created_at FROM usuarios');
      return rows;
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }

  // 2. Buscar un usuario por su ID
  async obtenerPorId(id) {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query('SELECT id, nombre, email, rol, created_at FROM usuarios WHERE id = ?', [id]);
      return rows[0]; // Retorna el usuario o undefined
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }

  // 3. Buscar por email (Útil para login o validación)
  async buscarPorEmail(email) {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query('SELECT * FROM usuarios WHERE email = ?', [email]);
      return rows[0];
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }

  // 4. Crear un nuevo usuario
  async crear(usuarioData) {
    let conn;
    const { nombre, email, password, rol } = usuarioData;
    try {
      conn = await pool.getConnection();
      const result = await conn.query(
        'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)',
        [nombre, email, password, rol || 'cajero']
      );
      return { id: Number(result.insertId), nombre, email, rol: rol || 'cajero' };
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }

  // 5. Actualizar un usuario existente
  async actualizar(id, usuarioData) {
    let conn;
    const { nombre, email, rol } = usuarioData;
    try {
      conn = await pool.getConnection();
      const result = await conn.query(
        'UPDATE usuarios SET nombre = ?, email = ?, rol = ? WHERE id = ?',
        [nombre, email, rol, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }

  // 6. Eliminar un usuario
  async eliminar(id) {
    let conn;
    try {
      conn = await pool.getConnection();
      const result = await conn.query('DELETE FROM usuarios WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }
}

module.exports = new UsuarioRepository();
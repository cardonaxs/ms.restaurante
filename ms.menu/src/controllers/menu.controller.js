const menuService = require('../services/menu.service');

class MenuController {
  async listar(req, res) {
    try {
      const productos = await menuService.obtenerMenu();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async crear(req, res) {
    try {
      const nuevoProducto = await menuService.crearPlato(req.body);
      res.status(201).json({ mensaje: 'Producto creado exitosamente', data: nuevoProducto });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new MenuController();
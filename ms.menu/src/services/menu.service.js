const menuRepository = require('../repositories/menu.repository');

class MenuService {
  async obtenerMenu() {
    return await menuRepository.obtenerTodos();
  }

  async crearPlato(datos) {
    if (!datos.nombre || !datos.precio) {
      throw new Error('El nombre y el precio son obligatorios');
    }
    return await menuRepository.crear(datos);
  }
}

module.exports = new MenuService();
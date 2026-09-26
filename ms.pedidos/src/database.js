const mariadb = require('mariadb');

// Configuración de conexión para la base de datos de pedidos
const pool = mariadb.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'cafeteria_pedidos_db',
  port: process.env.DB_PORT || 3306,
  connectionLimit: 5
});

// Probar conexión inicial
pool.getConnection()
  .then(conn => {
    console.log(' Conexión exitosa a la base de datos: cafeteria_pedidos_db');
    conn.release();
  })
  .catch(err => {
    console.error(' Error al conectar con cafeteria_pedidos_db:', err.message);
  });

module.exports = pool;
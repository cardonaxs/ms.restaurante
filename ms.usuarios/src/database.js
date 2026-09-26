const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'cafeteria_usuarios_db', // El nombre de la base de datos de este microservicio
    connectionLimit: 5
});

module.exports = pool;
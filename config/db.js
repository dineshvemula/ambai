const mysql = require('mysql2/promise');
let pool;

const createConnectionPool = async () => {
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "ambai",
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0
  });

  // now get a Promise wrapped instance of that pool
  promisePool = pool.promise();
  // query database using promises

  try {
    const [rows, fields] = await promisePool.query("SELECT 1");
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

const getPool = () => {
  return { pool, pool$: pool.promise() }
}

module.exports = { getPool, createConnectionPool }
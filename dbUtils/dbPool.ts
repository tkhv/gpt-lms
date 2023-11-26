const { Pool } = require("pg");

const pool = new Pool({
  max: 300,
  connectionTimeoutMillis: 5000,
  host: process.env.AZURE_COSMOSDB_PG_URL,
  port: 5432,
  user: process.env.AZURE_COSMOSDB_PG_USER,
  password: process.env.AZURE_COSMOSDB_PG_PASSWORD,
  database: process.env.AZURE_COSMOSDB_PG_DBNAME,
  ssl: true,
});

export default pool;

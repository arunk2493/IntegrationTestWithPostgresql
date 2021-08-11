const Pool = require('pg-pool')

const pool = new Pool({
    database: 'postgres',
    user: 'postgres',
    password: 'example',
    port: 5432,
    max: 10, // Pool max size
    idleTimeoutMillis: 1000 // Close idle clients after 1 second
})

module.exports.query = (text, values) => {
    return pool.query(text, values)
}
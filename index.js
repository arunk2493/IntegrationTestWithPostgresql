const express = require('express')
const poolClient = require('./poolClient')

const PORT = process.env.PORT || 3005
const app = express()

// Parse request body
app.use(express.json())

app.post('/note', async function (req, res, next) {
    try {
        const { name, content } = req.body
        if (!name || !content) {
            const error = new Error('Missing params')
            return next(error)
        }

        const queryParams = [name, content]
        const query = 'INSERT INTO note (name, content) VALUES ($1, $2)'
        await poolClient.query(query, queryParams)

        console.log(`Note successfully inserted: ${name}`)
        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
})

// Handle errors hardcoding status 400 for the sake of simplicity in our example
app.use(function (err, req, res, next) {
    if (err) {
        console.error(err)
        res.sendStatus(400)
    }
})

app.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}`)
})

module.exports = app
const express = require('express')
const app = express()
const path = require('path')
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3500

app.use(logger)

app.use(express.json()) // use json in our app

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public'))) // find css, images, etc, static files

app.use('/', require('./routes/root'))


app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({message: '404 Not Found'})
    } else {
        res.type('txt').send('404 NotFound')
    }
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

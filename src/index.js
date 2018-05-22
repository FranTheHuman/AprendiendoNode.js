const express = require ('express')
const app = express()
const path = require('path')
const morgan = require('morgan')

// settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//midlewares 
app.use(morgan('dev'))

//routes
const rutas = require('./routes/index')
app.use(rutas)

// static files
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res) => {
    res.status(404).end('404 not found')
})

// server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'))
})
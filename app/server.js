const path = require('path')
const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

var priceRouter = require('./routes/price')
app.use('/price', priceRouter);

app.listen(port, () => console.log(`App listening on port ${port}!`))

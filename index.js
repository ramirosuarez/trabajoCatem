const express = require('express')
const app = express()
const port = process.env.PORT || 3000

var bodyParser = require('body-parser')
 
 

const { config } = require('./config')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

var path = require('path')

//Apunta a otro archivo que sirve como router principal
const siteRoute = require('./routes/siteRoutes')
// Midewares
app.use('/static', express.static(__dirname + '/public'))


app.set('view engine', 'pug')
app.set('views', path.join(__dirname + '/views'))

/* app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'))
}) */

app.use('/', siteRoute)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

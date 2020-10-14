const express = require('express')
const app = express()
const port = 3000

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

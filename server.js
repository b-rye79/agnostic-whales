const express = require('express')
const app = express()
var api = require('./api')

app.use('/api', api)
app.use(express.static(__dirname + '/dist'))
app.get('/*', (req, res) => res.sendFile(__dirname +  '/dist/index.html'))
app.listen(3000, () => console.log('App listening on port 3000'))

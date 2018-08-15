const http = require('http'),
      path = require('path'),
      Routing = require('./rutas.js'),
      express = require('express'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose');
      mongoose.Promise = global.Promise;

const PORT = 3000;
const app = express()

const Server = http.createServer(app)

mongoose.connect('mongodb://localhost/calendar')
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We are connected!");
});

app.use(express.static(__dirname+'/../client'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use('/users', Routing)

Server.listen(PORT, function() {
  console.log('Server is listeng on port: ' + PORT)
})

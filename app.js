'use strict'
// este es el fichero para generar el servidor
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//carga de rutas
var album_routes = require('./routes/album');
var image_routes = require('./routes/image');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//middleware cors
app.use((req, res, next)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Metod');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  next();
});

// configurar cabeceras

//rutas base
app.use('/api', album_routes);
app.use('/api', image_routes);

module.exports = app; // crea objeto que se puede usar fuera
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

// configurar cabeceras

//rutas base
app.use('/api', album_routes);
app.use('/api', image_routes);

module.exports = app; // crea objeto que se puede usar fuera
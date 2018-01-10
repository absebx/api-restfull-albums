'use strict'

var express = require('express');
var ImageController = require('../controllers/image');
var api = express.Router();

api.get('/image-test', ImageController.test);
api.get('/image/:id', ImageController.getImage);
api.post('/image', ImageController.saveImage);

module.exports = api;
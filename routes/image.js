'use strict'

var express = require('express');
var ImageController = require('../controllers/image');
var api = express.Router();

var multipart = require('connect-multiparty');
//middleware diciendo donde se guardarán las imágenes
var multipartMiddleware = multipart({uploadDir: './uploads'});

api.get('/image-test', ImageController.test);
api.get('/image/:id', ImageController.getImage);
api.post('/image', ImageController.saveImage);
api.get('/images/:album?', ImageController.getImages);
api.put('/image/:id', ImageController.updateImage);
api.delete('/image/:id', ImageController.deleteImage);
api.post('/upload-image/:id', multipartMiddleware ,ImageController.uploadImage); //así se ejecuta el middleware
api.get('/get-image/:imageFile', multipartMiddleware, ImageController.getImageFile);

module.exports = api;
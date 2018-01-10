'use strict'

var express = require('express');
var ImageController = require('../controllers/image');
var api = express.Router();

api.get('/image', ImageController.test);

module.exports = api;
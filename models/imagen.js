'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ImageSchema = Schema({
  title: String,
  picture: String,
  album: {type: Schema.ObjectId, ref: 'Album'} // esto es para hacer la referencia al album
});
module.exports = mongoose.model('Image', ImageSchema);
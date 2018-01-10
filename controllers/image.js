'use strict'

var Image = require('../models/image');
var Album = require('../models/album');

function test(req,res){
  res.status(200).send({message: 'imagecontroller working'});
};

module.exports = {
  test
};
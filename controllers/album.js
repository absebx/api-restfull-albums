'use strict'

var Album = require('../models/album');

function getAlbum(req, res){
  var albumId = req.params.id;
  Album.findById(albumId, (err, album)=>{
    if(err){
      res.status(500).send({message: "Error in petition"}); //no se usa return para que no tenga problemas en la cabecera
    }else{
      if(!album){
        res.status(404).send({message: "Album not found"}); 
      }else{
        res.status(200).send({album});
      }
    }
  })
}

function getAlbums(req, res){
  Album.find({}, (err, albums)=>{
    if(err){
      res.status(500).send({message: "Error in petition"}); //no se usa return para que no tenga problemas en la cabecera
    }else{
      if(!albums){
        res.status(404).send({message: "there are not albums"}); 
      }else{
        res.status(200).send({albums});
      }
    }
  })
}

module.exports = {
  getAlbum,
  getAlbums
};
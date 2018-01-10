'use strict'

var Image = require('../models/image');
var Album = require('../models/album');

function test(req,res){
  res.status(200).send({message: 'imagecontroller working'});
};

function getImage(req,res){
  var imageId = req.params.id;
  Image.findById(imageId, (err,image)=>{
    if(err){
      res.status(500).send({message: "ERROR in petition"});
    }else{
      if(!image){
        res.status(404).send({message: "image not found!"});
      }else{
        Album.populate(image,{path: 'album'}, (err, image)=>{
          if(err){
            res.status(500).send({message: "ERROR in petition"});
          }else{
            res.status(200).send({image});
          }
        });
      }
    }
  });
}

function getImages (req,res){
  var albumId = req.params.id;
  if(!albumId){
    //sacar todas las imagenes
    var find = Image.find({});
  }else{
    //sacar las imagenes de ese album
    var find = Image.find({album: albumId});
  }
  find.sort('-title').exec((err,images)=>{
    if(err){
      res.status(500).send({message: "ERROR in petition"});
    }else{
      if(!images){
        res.status(404).send({message: "There are no images"});
      }else{
        Album.populate(images,{path: 'album'}, (err, images)=>{
          if(err){
            res.status(500).send({message: "ERROR in petition"});
          }else{
            res.status(200).send({images});
          }
        });
      }
    }
  });
}

function saveImage(req, res){
  var image = new Image();
  var params = req.body;
  image.title = params.title;
  image.picture = null; //esto se hará internamente
  image.album = params.album;

  image.save((err,imageStored)=>{
    if(err){
      res.status(500).send({message: "ERROR in petition"});
    }else{
      if(!imageStored){
        res.status(404).send({message: "Error in save!"});
      }else{
        res.status(200).send({image: imageStored});
      }
    }
  });
}

module.exports = {
  test,
  getImage,
  getImages,
  saveImage
};
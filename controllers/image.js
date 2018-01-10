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
  saveImage
};
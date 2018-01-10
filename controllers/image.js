'use strict'
var path = require('path');
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
  find.sort('title').exec((err,images)=>{
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

function updateImage(req, res){
  var imageId = req.params.id;
  var update = req.body;
  Image.findByIdAndUpdate(imageId, update, (err,imageUpdated)=>{
    if(err){
      res.status(500).send({message: "error in petition"});
    }else{
      if(!imageUpdated){
        res.status(404).send({message: "image not found!"});
      }else{
        res.status(200).send({image: imageUpdated});
      }
    }
  });
}

function deleteImage(req,res){
  var imageId = req.params.id;
  Image.findByIdAndRemove(imageId, (err,imageDeleted)=>{
    if(err){
      res.status(500).send({message: "error in petition"});
    }else{
      if(!imageDeleted){
        res.status(404).send({message: "image not found!"});
      }else{
        res.status(200).send({image: imageDeleted});
      }
    }
  })
}

function uploadImage(req, res){
  var imageId = req.params.id;
  var file_name = 'not uploaded';
  if(req.files){
    var file_path = req.files.image.path;
    var file_split = file_path.split('\\');
    var file_name = file_split[1];

    Image.findByIdAndUpdate(imageId, {picture: file_name}, (err,imageUpdated)=>{
      if(err){
        res.status(500).send({message: "error in petition"});
      }else{
        if(!imageUpdated){
          res.status(404).send({message: "image not found!"});
        }else{
          res.status(200).send({image: imageUpdated});
        }
      }
    });
  }else{
    res.status(200).send({message: "there arent any image"});
  }
}

var fs = require('fs');
function getImageFile(req, res){
  var imageFile = req.params.imageFile;

  fs.exists('./uploads/'+imageFile, function(exists){
    if(exists){
      res.sendFile(path.resolve('./uploads/'+imageFile));
    }else{
      res.status(404).send({message: 'file not found'});
    }
  });


  
}

module.exports = {
  test,
  getImage,
  getImages,
  saveImage,
  updateImage,
  deleteImage,
  uploadImage,
  getImageFile
};
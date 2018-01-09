'use strict'
var mongoose = require('mongoose'); //obtener mongoose en una variable

var app = require('./app');

var port= process.env.PORT || 3700; //si no encuentra el puerto, lo deja en el 3700
mongoose.connect('mongodb://localhost:27017/app_albuns', (err, res) => {
  if(err){
    throw err;
  }else{
    console.log("Database working well");
    app.listen(port, ()=>{
      console.log('api restfull lisening');
    });
  }
});
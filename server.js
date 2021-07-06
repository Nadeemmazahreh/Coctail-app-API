'use strict'

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require("mongoose");

const server = express()

require('dotenv').config();
server.use(cors());
server.use(express.json());
const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server running at PORT:${PORT}/`);
  });

mongoose.connect("mongodb://Nadeemmazahreh:Nadeem.mazahreh97@cluster0-shard-00-00.ekku4.mongodb.net:27017,cluster0-shard-00-01.ekku4.mongodb.net:27017,cluster0-shard-00-02.ekku4.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-h6w2g9-shard-0&authSource=admin&retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true });

//Schema 
const CoctailSchema = new mongoose.Schema({
  name: String,
  img : String,
});

//Model 
const coctailModel = mongoose.model('Coctail',CoctailSchema);


//Routes
server.get('/all',allDataHandler);
server.post('/addToFav', addToFavHandler);
server.get('/getFav', getFavHandler);
server.delete('/deleteFav/:id', deleteFavHandler);

//Handlers
function allDataHandler(req,res){
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic'
  axios
  .get(url)
  .then(result =>{
    res.send(result.data.drinks);
  })
}

function addToFavHandler(req,res){
    const {name,img} =req.body;
    const item = new coctailModel({
        name : name,
        img : img,
    })
    item.save();
    consol.log(item)
}


function getFavHandler(req,res){
  coctailModel.find({}, (err,data) =>{
    res.send(data);
  })
}


function deleteFavHandler(req,res){
  const id = req.body.id;
  coctailModel.deleteOne({_id:id},(err,data) =>{
    coctailModel.find({},(err,data) =>{
      res.send(data);
    })
  })
}
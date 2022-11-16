//  const express = require("express");
//  const { MongoClient } = require('mongodb');
import express, { response } from "express";
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv'

dotenv.config()


const app=express();
const port=process.env.port || 7000;

console.log(process.env);

 
const MONGO_URL=process.env.MONGO_URL;

  
 async function createConnection(){  
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("MongoDB conected")
    return client;
 }
 const client = await createConnection();
 app.use(express.json())


app.get("/",function(req,res){
    res.send("Hii guys😎😎😎😎😎")
})

app.get("/movies",async(req,res)=>{ 
    const {language,rating}=req.query;
    console.log(req.query,language)
    // let filteredMovies=movies;
    // if(language){
    //     filteredMovies=filteredMovies.filter((mv) => mv.language==language)
    // }
    // if(rating){
    //     filteredMovies=filteredMovies.filter((mv) =>mv.rating==rating)
    // }
if  (req.query.rating){
    req.query.rating= +request.query.rating;
}
     

    const movie=await client
    .db("DATABASE")
    .collection("movies")
    .find(req.query)
    .toArray();
    res.send(movie)
})

app.post("/movies",async(req,res)=>{ 
    const newMovies=req.body; 
 
    console.log(newMovies)

     const result=await client
    .db("DATABASE")
    .collection("movies")
    .insertMany(newMovies)
    
    res.send(result)
})
app.get("/movies/:id",async (req,res)=>  {

    const {id}=req.params
    console.log(id)
    //const movie=movies.find((mv)=>mv.id==id)
    const movie=await client
    .db("DATABASE")
    .collection("movies")
    .findOne({id: id})
    movie ? res.send(movie): res.status(404).send({message:"No movies found"}) 
   })

app.delete("/movies/:id",async (req,res)=>  {

  const {id}=req.params
  console.log(id)
  //const movie=movies.find((mv)=>mv.id==id)
  const movie=await client
  .db("DATABASE")
  .collection("movies")
  .findOne({id: id})
   movie ? res.send(movie):res.status(404).send({message:"No movies found"}) 
})

app.listen(port,()=>{console.log("Port started at: ",port)})
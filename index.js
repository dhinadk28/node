//  const express = require("express");
//  const { MongoClient } = require('mongodb');
import express, { response } from "express";
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv'
import {movieRouter} from "./routes/movie.js"
import {usersRouter} from "./routes/users.js"
import bcrypt from "bcrypt"
import cors from "cors"



export const app=express();
app.use(cors());

dotenv.config()

const PORT=process.env.PORT;


console.log(process.env);


 
const MONGO_URL=process.env.MONGO_URL;

  
 async function createConnection(){  
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("MongoDB conected")
    return client;
 }
 export const client = await createConnection();
 app.use(express.json())


app.get("/",function(req,res){
    res.send("Hii guys😎😎😎😎😎")
})

app.use("/movies",movieRouter)
app.use("/users",usersRouter)

app.listen(PORT,()=>{console.log("Port started at:",PORT)})

 


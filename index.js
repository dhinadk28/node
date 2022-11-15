//  const express = require("express");
//  const { MongoClient } = require('mongodb');
import express, { response } from "express";
import { MongoClient } from 'mongodb';


const app=express();
// const port=7000;
// const movies = [
//     {
//       id: "100",
//       name: "RRR",
//       poster:
//         "https://englishtribuneimages.blob.core.windows.net/gallary-content/2021/6/Desk/2021_6$largeimg_977224513.JPG",
//       rating: 8.8,
//       summary:
//         "RRR is an upcoming Indian Telugu-language period action drama film directed by S. S. Rajamouli, and produced by D. V. V. Danayya of DVV Entertainments.",
//       trailer: "https://www.youtube.com/embed/bwzLiQZDw2I",  
//       language: "telugu",
//     },
//     {
//       id: "101",
//       name: "Iron man 2",
//       poster:
//         "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg",
//       rating: 7,
//       summary:
//         "With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.",
//         language: "telugu",
//     },
//     {
//       id: "102",
//       name: "No Country for Old Men",
//       poster:
//         "https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg",
//       rating: 8.1,
//       summary:
//         "A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money.",
//         language: "english",
//     },
//     {
//       id: "103",
//       name: "Jai Bhim",
//       poster:
//         "https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
//       summary:
//         "A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
//       rating: 8.8,
//       language: "tamil",
//     },
//     {
//       id: "104",
//       name: "The Avengers",
//       rating: 6,
//       summary:
//         "Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.",
//       poster:
//         "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
//         language: "english",
//     },
//     {
//       id: "105",
//       name: "Interstellar",
//       poster: "https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg",
//       rating: 8.6,
//       summary:
//         "When Earth becomes uninhabitable in the future, a farmer and ex-NASA\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\n of researchers, to find a new planet for humans.",
//         language: "english",
//     },
//     {
//       id: "106",
//       name: "Baahubali",
//       poster: "https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg",
//       rating: 8,
//       summary:
//         "In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.",
//         language: "english",
//     },
//     {
//       id: "107",
//       name: "Ratatouille",
//       poster:
//         "https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=",
//       rating: 8,
//       summary:
//         "Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.",
//         language: "english",
//     }
//   ];
 
const MONGO_URL='mongodb+srv://Dhinadk28:Dhinadk28@cluster0.8o2pt1u.mongodb.net/?retryWrites=true&w=majority';

  
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
const port=7000;
app.listen(port,()=>{console.log("Port started at: ",port)})
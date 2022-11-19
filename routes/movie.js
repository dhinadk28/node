import { getAllMovies, addMovies, updateMovieById, GetMovieById, deleteMovieById } from "../helper.js";
import express from "express";
import { auth } from "./middleware/auth.js"


const router=express.Router()

router.get("/", async (req, res) => {
    const { language, rating } = req.query;
    console.log(req.query, language);

    if (req.query.rating) {
        req.query.rating = +request.query.rating;
    }


    const movie = await getAllMovies(req);
    res.send(movie);
});
router.post("/", async (req, res) => {
    const newMovies = req.body;

    console.log(newMovies);

    const result = await addMovies(newMovies);

    res.send(result);
});
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updateMovies = req.body;

    console.log(newMovies);

    const result = await updateMovieById(id, updateMovies);

    res.send(result);
});
router.get("/:id", async (req, res) => {

    const { id } = req.params;
    console.log(id);
    //const movie=movies.find((mv)=>mv.id==id)
    const movie = await GetMovieById(id);
    movie ? res.send(movie) : res.status(404).send({ message: "No movies found" });
});
router.delete("/:id", async (req, res) => {

    const { id } = req.params;
    console.log(id);
    //const movie=movies.find((mv)=>mv.id==id)
    const movie = await deleteMovieById(id);
    movie ? res.send(movie) : res.status(404).send({ message: "No movies found" });
});

export const movieRouter=router; 
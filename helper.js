import { client } from "./index.js ";
import bcrypt from "bcrypt"


export async function deleteMovieById(id) {
    return await client
        .db("DATABASE")
        .collection("movies")
        .findOne({ id: id });
}
export async function getAllMovies(req) {
    return await client
        .db("DATABASE")
        .collection("movies")
        .find(req.query)
        .toArray();
}
export async function GetMovieById(id) {
    return await client
        .db("DATABASE")
        .collection("movies")
        .findOne({ id: id });
}
export async function updateMovieById(id, updateMovies) {
    return await client
        .db("DATABASE")
        .collection("movies")
        .updateOne({ id: id }, { $set: updateMovies });
}
export async function addMovies(newMovies) {
    return await client
        .db("DATABASE")
        .collection("movies")
        .insertMany(newMovies);
}
 export async function genPassword(password){
    const salt= await bcrypt.genSalt(10)
    console.log(salt);
    const hashedPassword = await bcrypt.hash(password,salt)
    return hashedPassword;
}
console.log(genPassword("pass123"));


export async function createUser(username,hashedPassword){
    return await client
        .db("DATABASE")
        .collection("users")
        .insertOne({ username: username, password:hashedPassword });
    
}

export async function getUserByName(username){
    return  await client
    .db("DATABASE")
    .collection("users")
    .findOne({ username: username});
}
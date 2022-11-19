import { genPassword ,createUser,getUserByName } from "../helper.js";
import bcrypt from "bcrypt"
import express from "express"
import jwt from "jsonwebtoken"
import { auth } from "./middleware/auth.js"


const router=express.Router()



 router.post("/signup", async (req, res) => {
    const{username,password} = req.body;
    console.log(username,password);
     const isUserExist = await getUserByName(username);
     console.log(isUserExist);
    if(isUserExist){
      res.status(400).send({message:"user already exist"})
      return;
    }
    if( !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&]).{8,}$/g.test(password))
        {
            res.status(400).send({message:"password pattern doesnt matched"})
          return;
        }
    
    const hashedPassword= await genPassword(password);
    const result =  await createUser(username,hashedPassword)
   //  console.log(hashedPassword);
   res.send(result);
   
   //  const result = await addMovies(newMovies);

   //  res.send(result);
   });

   router.post("/login", auth, async (req, res) => {
    const{username,password} = req.body;
    console.log(username,password);
     const userFromDB = await getUserByName(username);
     console.log(userFromDB);
    if(!userFromDB){
      res.status(400).send({message:"username invalid credentials"})
      return;
    }
    const storedPassword=userFromDB.password; 
    const isPasswordMatch= await bcrypt.compare(password,storedPassword)
    if(!isPasswordMatch){
      res.status(400).send({message:"password invalid credentials"})
      return;
    }
    const token=jwt.sign({id:userFromDB._id},process.env.SECRET_KEY)
    console.log(token);
    res.send({message:"sucessful login",token:token})
    
 

  });
    export const usersRouter=router; 
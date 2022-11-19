
import jwt from "jsonwebtoken"
import { Logger } from "mongodb"

export const auth=(req,res,next)=>{
   
    try{
        const token=req.header("x-auth-token")
        console.log(token);
        jwt.verify(token,process.env.SECRET_KEY)
        next();

    }catch(err){
        res.send({error:err.message})
    }
    
}
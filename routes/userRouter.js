import express from "express";
import HttpError from "../errors/httpError.js";
import * as usersService from "../services/usersService.js";

const router = express.Router();

/**
 * registr user route.
 */
router.post("/register", async (req,res, next)=>{

    try{
      const {username, password} = req.body;
      
      if(!username || !password){
         throw new Error("username and password must be included", 400);
      } 
      
      await usersService.registerUser(username, password);

      return res.status(200).json({message : "user added successfully."})

    }catch(error){
        next(error);
    }
})




export default router;
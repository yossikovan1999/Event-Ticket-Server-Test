import express from "express";
import {PORT} from "./consts.js"

const app = express();

app.use(express.json());


app.listen((PORT), ()=>{

    console.log(`application started successfully - http://localhost:${PORT}`)

})
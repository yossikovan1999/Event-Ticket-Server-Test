import express from "express";
import {PORT} from "./consts.js";
import userRouter from "./routes/userRouter.js";
import receiptRouter from "./routes/receiptRouter.js";
import eventRouter from "./routes/eventRouter.js";
import errorMiddleware from "./middleware/errorMiddleware.js";


const app = express();

app.use(express.json());

//routes 
app.use("/users", userRouter);


//this will handle errors globaly.
app.use(errorMiddleware);

//start app.
app.listen((PORT), ()=>{

    console.log(`application started successfully - http://localhost:${PORT}`)

})
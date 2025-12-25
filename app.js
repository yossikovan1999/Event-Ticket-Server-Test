import express from "express";
import {PORT} from "./consts.js";
import usersRouter from "./routes/userRouter.js";
import creatorRouter from "./routes/creatorRouter.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

app.use(express.json());

//routes 
app.use("/users", usersRouter);
app.use("/creator", creatorRouter);

//this will handle errors globaly.
app.use(errorMiddleware);

//start app.
app.listen((PORT), ()=>{

    console.log(`application started successfully - http://localhost:${PORT}`)

})
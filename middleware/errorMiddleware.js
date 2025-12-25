import HttpError from "../errors/httpError.js";

function errorMiddleware(err, req, res, next){

    if(err instanceof HttpError){
         return res.status(404).json({message : err.message})
    }

    return res.status(404).json({message : "error"})
}

export default errorMiddleware;
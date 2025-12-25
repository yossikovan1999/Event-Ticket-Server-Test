import {readJsonFile, writeJsonFile, appendToJsonFile} from "./jsonService.js";
import {USERS_FILE} from "../consts.js";
import HttpError from "../errors/httpError.js";

async function validateUniqueUsername(username){

    const users = await readJsonFile(USERS_FILE);
    
    const user = users.find(user=>user.username === username);

    if(user){
        throw new HttpError("username must be unique", 409);
    }
} 


export async function registerUser(username, password){

    await validateUniqueUsername(username);

    const user = {username : username, password : password}
    
    await appendToJsonFile(USERS_FILE, user);
}
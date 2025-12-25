import {readJsonFile,writeJsonFile,appendToJsonFile} from "./jsonService.js";
import { USERS_FILE } from "../consts.js";
import HttpError from "../errors/httpError.js";
import { buyIfPossible } from "./eventService.js";
import {createReceipt, getReceiptSummary} from "./receiptService.js";

/**
 * 
 * @param {*} username 
 */
async function validateUniqueUsername(username) {
  const users = await readJsonFile(USERS_FILE);

  const user = users.find((user) => user.username === username);

  if (user) {
    throw new HttpError("username must be unique", 409);
  }
}

/**
 * 
 * @param {*} username 
 * @param {*} password 
 */
export async function registerUser(username, password) {
  await validateUniqueUsername(username);

  const user = { username: username, password: password };

  await appendToJsonFile(USERS_FILE, user);
}

/**
 * 
 * @param {*} eventName 
 * @param {*} quantity 
 */
export async function buyTicket(username, eventName, quantity) {
  await buyIfPossible(eventName, quantity);
  await createReceipt(username, eventName, quantity);
}

/**
 * 
 * @returns 
 */
export async function getSummary(useranme){

  const receiptSummary = await getReceiptSummary(useranme);
  return receiptSummary
}
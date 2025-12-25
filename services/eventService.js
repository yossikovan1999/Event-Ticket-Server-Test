import * as jsonService from "../services/jsonService.js";
import { EVENTS_FILE } from "../consts.js";
import HttpError from "../errors/httpError.js";

/**
 * 
 * @param {*} eventName 
 * @returns 
 */
async function getEventsAndValidateUnique(eventName) {
  const events = await jsonService.readJsonFile(EVENTS_FILE);

  const event = events.find((event) => event.eventName === eventName);

  if (event) {
    throw new HttpError("event already exists.", 409);
  }

  return events;
}



/**
 * this function will validate if purchase is possible and remove the quantity if possible
 * @param {*} eventName 
 * @param {*} quantity 
 */
export async function buyIfPossible(eventName, quantity){

  const events = await jsonService.readJsonFile(EVENTS_FILE);

  const event = events.find(
    (event) => event.eventName.toLowerCase() === eventName.toLowerCase()
  );
  

  if(!event){
    throw new HttpError("event not found.", 404);
  }

  if(Number(event.ticketsForSale) - Number(quantity) < 0){
    throw new HttpError("Not enough tickets in stock", 400);
  }

  event.ticketsForSale = String(Number(event.ticketsForSale) - Number(quantity));
  console.log(event.ticketsForSale);
  await jsonService.writeJsonFile(EVENTS_FILE, events);
}

/**
 * 
 * @param {*} eventName 
 * @param {*} ticketsForSale 
 */
export async function addEvent(eventName, ticketsForSale) {
  const events = await getEventsAndValidateUnique(eventName);

  const event = { eventName: eventName, ticketsForSale: ticketsForSale };
  
  if(isNaN(ticketsForSale)){
    throw new HttpError("ticket number must be a number", 400);
  }

  events.push(event);

  await jsonService.writeJsonFile(EVENTS_FILE, events);
}

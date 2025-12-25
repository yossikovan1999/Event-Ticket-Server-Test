import {
  readJsonFile,
  writeJsonFile,
  appendToJsonFile,
} from "./jsonService.js";
import { RECEIPTS_FILE } from "../consts.js";
import HttpError from "../errors/httpError.js";
import { buyIfPossible } from "./eventService.js";

/**
 *
 * @param {*} username
 * @param {*} eventName
 * @param {*} quantity
 */
export async function createReceipt(username, eventName, quantity) {
  const receipt = {
    username: username,
    eventName: eventName,
    quantity: quantity,
  };

  await appendToJsonFile(RECEIPTS_FILE, receipt);
}

/**
 *
 * @param {*} useranme
 */
export async function getAllReceipt(useranme) {
  const receipts = await readJsonFile(RECEIPTS_FILE);
  return receipts;
}

/**
 *
 * @param {*} username
 * @returns
 */
export async function getReceiptSummary(username) {
  const receipts = await getAllReceipt();

  const filteredReceipts = receipts.filter(
    receipt => receipt.username === username
  );
  

  if(filteredReceipts.length === 0){
    throw new HttpError("username has no receipts")
  }

  
  //get all events 
  const events = new Set(filteredReceipts.map((receipt) => receipt.eventName));
  
  //calculate number of receipts
  const totalTickets = filteredReceipts.reduce((sum, receipt) => Number(receipt.quantity) + sum, 0);
  
  //get the average.
  const average = totalTickets / events.size;
  
  //return the receipts Summary object
  return {
    totalTicketsBought: totalTickets,
    events: events.size,
    averageTicketsPerEvent: average,
  };
}

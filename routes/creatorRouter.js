import express from "express";
import * as eventServices from "../services/eventService.js";
import HttpError from "../errors/httpError.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

/**
 * post a event router
 */
router.post("/events", authMiddleware, async (req, res, next) => {
  try {
    const { eventName, ticketsForSale, username} = req.body;

    if (!eventName || !ticketsForSale) {
      throw new HttpError("must include event name and tickes amount", 400);
    }

    await eventServices.addEvent(username, eventName, ticketsForSale);
    return res.status(200).json({ message: "event added successfully." });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

export default router;

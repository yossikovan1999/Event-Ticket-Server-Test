import express from "express";
import HttpError from "../errors/httpError.js";
import * as usersService from "../services/usersService.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * registr user route.
 */
router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new Error("username and password must be included", 400);
    }

    await usersService.registerUser(username, password);

    return res.status(200).json({ message: "user added successfully." });
  } catch (error) {
    next(error);
  }
});

/**
 * buy a ticket route.
 */
router.post("/tickets/buy", authMiddleware, async (req, res, next) => {
  try {
    const { username, eventName, quantity } = req.body;

    if (!eventName || !quantity) {
      throw new HttpError("must send a event name and a quantiy", 400);
    }

    await usersService.buyTicket(username, eventName, quantity);

    return res.status(200).json({ message: "purchase was successful." });
  } catch (error) {
    next(error);
  }
});

/**
 * get summery by username
 */
router.get("/:username/summary", async (req, res, next) => {
  try {
    const { username } = req.params;
    

    if (!username) {
      throw new HttpError("username must be included!");
    }

    const summary = await usersService.getSummary(username);
    return res.status(200).json(summary);

  } catch (error) {
    next(error);
  }
});

export default router;

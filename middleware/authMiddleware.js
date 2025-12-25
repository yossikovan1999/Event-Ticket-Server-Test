import HttpError from "../errors/httpError.js";
import * as jsonService from "../services/jsonService.js";
import { USERS_FILE } from "../consts.js";

/**
 *
 * @param {*} username
 * @param {*} password
 */
async function verifyUserAndPassword(username, password) {
  const users = await jsonService.readJsonFile(USERS_FILE);

  const user = users.find(
    (user) => user.username.toLowerCase() === username.toLowerCase()
  );

  if (!user) {
    throw new HttpError("user not registered please register", 404);
  }

  if (user.password !== password) {
    throw new HttpError("password not correct.", 400);
  }
}

/**
 * auth Middleware
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function authMiddleware(req, res, next) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new HttpError("you must pass a username and password.", 400);
    }

    await verifyUserAndPassword(username, password);

    next();
  } catch (error) {
    next(error);
  }
}

export default authMiddleware;

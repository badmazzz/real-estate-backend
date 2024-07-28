import { Request, Response } from "express";
import UserService from "../services/user.services";
import {
  userCreateValidator,
  userLoginValidator,
} from "../validators/user.validators";

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { error } = userCreateValidator(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const user = await UserService.createUser(req.body);
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { error } = userLoginValidator(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const token = await UserService.loginUser(req.body);
      res.status(200).send({ token });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getUsers();
      res.status(200).send(users);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default new UserController();

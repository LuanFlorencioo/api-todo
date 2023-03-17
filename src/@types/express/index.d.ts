import * as express from "express";
import { iUserLogged } from "../../interfaces";

declare global {
  namespace Express {
    interface Request {
      userLogged: iUserLogged
    }
  }
}
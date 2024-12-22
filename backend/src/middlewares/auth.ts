import { NextFunction, Request, Response } from "express";
var { verify } = require("jsonwebtoken");

export interface inputInterface {
  email: string;
  userName: string;
  password: string;
}

export interface postsInterface {
  title: string;
  content: string;
}
export async function authorize(req: any, res: Response, next: NextFunction) {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ error: "unauthorized" });
  }
  try {
    const verifedUser = await verify(token, process.env.JWT_SECRET);

    if (!verifedUser.id) {
      return res.status(401).json({ error: "You are not logged in" });
    }

    req.userId = verifedUser.id;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

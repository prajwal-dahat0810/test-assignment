const express = require("express");
var { sign } = require("jsonwebtoken");

import { Request, Response } from "express";
import { prisma } from "..";
import { inputInterface } from "../middlewares/auth";

export const userRouter = express.Router();

userRouter.get("/in", (req: Request, res: Response) => {
  return res.json({
    message: "post",
  });
});

userRouter.post("/signup", async (req: Request, res: Response) => {
  const { email, userName, password }: inputInterface = req.body;

  try {
    const userExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (userExist) {
      return res.json({
        message: "User exist already",
      });
    }
    const user = await prisma.user.create({
      data: {
        email,
        name: userName,
        password,
      },
    });
    const token = await sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET
    );
    res.cookie("token", token);

    return res.status(200).json({
      message: "success",
      token,
    });
  } catch (err: any) {
    res.status(500).json({
      message: "User creation Fails",
      error: err,
    });
  }
});

userRouter.get("/logout", (req: Request, res: Response) => {
  res.clearCookie("token");
  res.cookie("token", "");
  return res.json({
    message: "Logged out",
  });
});

userRouter.post("/signin", async (req: Request, res: Response) => {
  const { email, password }: Pick<inputInterface, "email" | "password"> =
    req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
        password: password,
      },
    });
    if (!user) {
      return res.status(200).json({
        message: "Enter correct credentials",
      });
    }
    const token = await sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET
    );
    res.cookie("token", token);
    return res.status(200).json({
      message: "success",
      token,
    });
  } catch (err: any) {
    res.status(500).json({
      message: "User login fails",
      error: err,
    });
  }
});

module.exports = userRouter;

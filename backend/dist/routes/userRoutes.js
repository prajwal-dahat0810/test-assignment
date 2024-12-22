"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express = require("express");
var { sign } = require("jsonwebtoken");
const __1 = require("..");
exports.userRouter = express.Router();
exports.userRouter.get("/in", (req, res) => {
    return res.json({
        message: "post",
    });
});
exports.userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, userName, password } = req.body;
    try {
        const userExist = yield __1.prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (userExist) {
            return res.json({
                message: "User exist already",
            });
        }
        const user = yield __1.prisma.user.create({
            data: {
                email,
                name: userName,
                password,
            },
        });
        const token = yield sign({
            id: user.id,
        }, process.env.JWT_SECRET);
        res.cookie("token", token);
        return res.status(200).json({
            message: "success",
            token,
        });
    }
    catch (err) {
        res.status(500).json({
            message: "User creation Fails",
            error: err,
        });
    }
}));
exports.userRouter.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.cookie("token", "");
    return res.json({
        message: "Logged out",
    });
});
exports.userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield __1.prisma.user.findUnique({
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
        const token = yield sign({
            id: user.id,
        }, process.env.JWT_SECRET);
        res.cookie("token", token);
        return res.status(200).json({
            message: "success",
            token,
        });
    }
    catch (err) {
        res.status(500).json({
            message: "User login fails",
            error: err,
        });
    }
}));
module.exports = exports.userRouter;

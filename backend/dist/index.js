"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const { PrismaClient } = require("@prisma/client");
const express = require("express");
const cookieParser = require("cookie-parser");
const PORT = 3001;
const userRoutes = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");
exports.app = express();
exports.prisma = new PrismaClient();
exports.app.use(cookieParser());
exports.app.use(express.json());
exports.app.use((0, cors_1.default)({ credentials: true, origin: "http://localhost:5173" }));
exports.app.use(express.urlencoded({ extended: true }));
exports.app.use("/api/v1/user", userRoutes);
exports.app.use("/api/v1/blog", blogRouter);
exports.app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

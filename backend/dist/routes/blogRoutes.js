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
exports.blogRouter = void 0;
const express = require("express");
exports.blogRouter = express.Router({ mergeParams: true });
const auth_1 = require("../middlewares/auth");
const __1 = require("..");
const summarize_1 = require("../summarize");
exports.blogRouter.post("/in", auth_1.authorize, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content } = req.body;
    try {
        const summary = yield (0, summarize_1.summarizeText)(content);
        return res.json({
            message: "success",
            summary: summary,
        });
    }
    catch (e) {
        return res.json({
            message: "Error while summarize data",
            error: e,
        });
    }
}));
exports.blogRouter.post("/posts", auth_1.authorize, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required" });
    }
    const authorId = req.userId;
    try {
        try {
            try {
                const blog = yield __1.prisma.post.create({
                    data: {
                        title: title,
                        content: content,
                        authorId: authorId,
                    },
                });
                return res.json({
                    message: "success",
                    id: blog.id,
                });
            }
            catch (e) {
                return res.json({
                    message: "Error while creating Post",
                    error: e,
                });
            }
        }
        catch (e) {
            return res.status(500).json({
                message: "Outside of the model's capabilities. ",
            });
        }
    }
    catch (err) {
        return res.json({
            message: "Error while creating Post",
            error: err,
        });
    }
}));
exports.blogRouter.get("/posts", auth_1.authorize, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authorId = req.userId;
    try {
        const blogs = yield __1.prisma.post.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                author: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        return res.json({
            message: "success",
            blogs: blogs,
        });
    }
    catch (e) {
        return res.json({
            message: "error",
            error: e,
        });
    }
}));
exports.blogRouter.get("/posts/:id", auth_1.authorize, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const blog = yield __1.prisma.post.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                author: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        return res.status(200).json({
            message: "success",
            blog: blog,
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Error while retrieving blog",
            error: err,
        });
    }
}));
exports.blogRouter.put("/posts/:id", auth_1.authorize, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { title, content } = req.body;
    const authorId = req.userId;
    try {
        const blog = yield __1.prisma.post.update({
            where: {
                id: id,
            },
            data: {
                title: title,
                content: content,
                authorId: authorId,
            },
        });
        return res.json({ message: "success", id: blog.id });
    }
    catch (e) {
        return res.json({ message: "Error while updating Blog !!!" });
    }
}));
exports.blogRouter.delete("/posts/:id", auth_1.authorize, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const blog = yield __1.prisma.post.delete({
            where: {
                id: id,
            },
        });
        return res.json({ message: "success", id: id });
    }
    catch (e) {
        return res.json({ message: "Error while deleting Blog !!!", error: e });
    }
}));
module.exports = exports.blogRouter;

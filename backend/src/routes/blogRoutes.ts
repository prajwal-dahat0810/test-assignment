const express = require("express");
export const blogRouter = express.Router({ mergeParams: true });
import { Request, Response } from "express";
import { authorize, postsInterface } from "../middlewares/auth";
import { prisma } from "..";
import { summarizeText } from "../summarize";

blogRouter.post("/in", authorize, async (req: Request, res: Response) => {
  const { content } = req.body;

  try {
    const summary = await summarizeText(content);

    return res.json({
      message: "success",
      summary: summary,
    });
  } catch (e) {
    return res.json({
      message: "Error while summarize data",
      error: e,
    });
  }
});

blogRouter.post("/posts", authorize, async (req: any, res: Response) => {
  const { title, content }: postsInterface = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  const authorId = req.userId;
  try {
    try {
      try {
        const blog = await prisma.post.create({
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
      } catch (e) {
        return res.json({
          message: "Error while creating Post",
          error: e,
        });
      }
    } catch (e) {
      return res.status(500).json({
        message: "Outside of the model's capabilities. ",
      });
    }
  } catch (err) {
    return res.json({
      message: "Error while creating Post",
      error: err,
    });
  }
});

blogRouter.get("/posts", authorize, async (req: any, res: Response) => {
  const authorId = req.userId;
  try {
    const blogs = await prisma.post.findMany({
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
  } catch (e) {
    return res.json({
      message: "error",
      error: e,
    });
  }
});

blogRouter.get("/posts/:id", authorize, async (req: any, res: Response) => {
  const id = req.params.id;

  try {
    const blog = await prisma.post.findUnique({
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
  } catch (err) {
    return res.status(500).json({
      message: "Error while retrieving blog",
      error: err,
    });
  }
});

blogRouter.put("/posts/:id", authorize, async (req: any, res: Response) => {
  const id = req.params.id;
  const { title, content } = req.body;
  const authorId = req.userId;
  try {
    const blog = await prisma.post.update({
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
  } catch (e) {
    return res.json({ message: "Error while updating Blog !!!" });
  }
});
blogRouter.delete("/posts/:id", authorize, async (req: any, res: Response) => {
  const id = req.params.id;

  try {
    const blog = await prisma.post.delete({
      where: {
        id: id,
      },
    });

    return res.json({ message: "success", id: id });
  } catch (e) {
    return res.json({ message: "Error while deleting Blog !!!", error: e });
  }
});

module.exports = blogRouter;

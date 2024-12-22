import cors from "cors";
const { PrismaClient } = require("@prisma/client");
const express = require("express");
const cookieParser = require("cookie-parser");
const PORT = 3001;

const userRoutes = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");
export const app = express();
export const prisma = new PrismaClient();

app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

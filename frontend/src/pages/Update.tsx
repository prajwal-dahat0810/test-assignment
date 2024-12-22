import { useNavigate, useParams } from "react-router";
import { blogs } from "./Landing";
import { UpdateBlog } from "../components/UpdateBlog";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../lib/config";
import axios from "axios";

export const Update = () => {
  const { id } = useParams();

  return <UpdateBlog id={id} />;
};

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { FullBlog } from "./FullBlog";
import { BACKEND_URL } from "../lib/config";
export const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  useEffect(() => {
    axios
      .get(
        `${BACKEND_URL}/api/v1/blog/posts/${id}`,

        { withCredentials: true }
      )
      .then((response) => {
        setBlog(response.data.blog);
        console.log(response.data);
      });
  }, [id]);

  return (
    <div>
      <FullBlog blog={blog}></FullBlog>
    </div>
  );
};

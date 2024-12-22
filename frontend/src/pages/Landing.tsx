import { useNavigate } from "react-router";
import BlogCard from "../components/BlogCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../lib/config";

export const blogs = [
  {
    id: "8527aad7-9714-46bf-8948-a64c08cada5f",
    title: "Leave useEffect Alone!",
    content:
      "As a full-stack developer at Melio, working on React-based web applications, I’ve seen firsthand that frontend development is as complex as backend work. Managing the state, ensuring responsiveness, and optimizing performance all contribute to the intricate challenges of the frontend",
    createdAt: "2024-12-20T19:35:30.390Z",
    author: {
      name: null,
    },
  },
  {
    id: "6770759d-8486-40fc-9d00-739de466e409",
    title: "Managing the state, ensuring responsiveness",
    content:
      "To create an access token, go to your settings, then click on the Access Tokens tab. Click on the New token button to create a new User Access Token. Select a role and a name for your token and voilà - you're ready to go!",
    createdAt: "2024-12-21T06:13:37.101Z",
    author: {
      name: null,
    },
  },
  {
    id: "a078a16d-2dcb-459b-a153-59185e3d5246",
    title: "Managing the state, ensuring responsiveness",
    content:
      "To create an access token, go to your settings, then click on the Access Tokens tab. Click on the New token button to create a new User Access Token. Select a role and a name for your token and voilà - you're ready to go!",
    createdAt: "2024-12-21T06:14:45.483Z",
    author: {
      name: null,
    },
  },
  {
    id: "41bdb24e-8d8f-4a19-a67d-c9cf007b856f",
    title: "hi htere",
    content:
      "To create an access token, go to your settings, then click on the Access Tokens tab. Click on the New token button to create a new User Access Token. Select a role and a name for your token and voilà - you're ready to go!",
    createdAt: "2024-12-21T06:16:53.792Z",
    author: {
      name: null,
    },
  },
];

export const Landing = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  useEffect(() => {
    try {
      axios
        .get(`${BACKEND_URL}/api/v1/blog/posts`, { withCredentials: true })
        .then((res) => {
          
          setBlogs(res.data.blogs);
        });
    } catch (e) {
      return alert(e);
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingInline: "5px",
      }}
    >
      <div className="flex justify-center">
        <div className="">
          {blogs && blogs.length === 0 && (
            <div className="pt-15 w-screen  min-h-96 flex items-center justify-center ">
              No Blogs Available
            </div>
          )}
          {blogs.length > 0 &&
            blogs.map((blog) => (
              <BlogCard
                title={blog.title}
                content={blog.content}
                createdAt={blog.createdAt}
                id={blog.id}
              ></BlogCard>
            ))}
        </div>
      </div>
    </div>
  );
};

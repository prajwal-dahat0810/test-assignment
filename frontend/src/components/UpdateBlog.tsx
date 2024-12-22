import {
  Box,
  Button,
  Card,
  CardContent,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../lib/config";
import { useNavigate } from "react-router";

export const UpdateBlog = ({ id }: any) => {
  const [blog, setBlog] = useState({
    title: "",
    content: "",

    id: id,
    author: {
      name: "",
    },
  });
  useEffect(() => {
    try {
      axios
        .get(
          `${BACKEND_URL}/api/v1/blog/posts/${id}`,

          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.blog) {
            setBlog(res.data.blog);
            setTitle(res.data.blog.title);
            setContent(res.data.blog.content);
            // setcreateAt(blog.createAt);
          } else {
            alert("Cannot get summary now try again");
          }
        });
    } catch (err) {
      alert(err);
    }
  }, []);
  //   const [createAt, setcreateAt] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [visible]);
  const navigate = useNavigate();
  async function handleUpdate() {
    try {
      console.log("click");
      const response = await axios.put(
        `${BACKEND_URL}/api/v1/blog/posts/${blog.id}`,
        {
          title: title,
          content: content,
          id: blog.id,
        },
        { withCredentials: true }
      );
      if (!response.data.id) {
        alert("Blog cannot updated , try again");
        setVisible(true);
      }
      navigate("/");
    } catch (e) {
      alert("Blog cannot updated , try again");
      setVisible(true);
    }
  }

  return (
    <Box minWidth="100px" p={4}>
      {/* Main Content Wrapper */}
      <Box display="flex" justifyContent="center">
        <Card
          sx={{
            maxWidth: "900px",
            width: "100%",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <CardContent>
            <Grid2 container spacing={4}>
              {/* Main Content Area */}
              <Grid2 size={{ xs: 12, md: 8 }} columnSpacing={{ xs: 12, md: 8 }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  mb={2}
                  color="primary"
                >
                  Edit Blog Post
                </Typography>
                <TextField
                  fullWidth
                  style={{ outline: "0" }}
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  placeholder="Enter Blog Title"
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={10}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your blog content here..."
                  sx={{
                    backgroundColor: "#f7f8fa",
                    borderRadius: "8px",
                    "& fieldset": { border: "none" },
                    p: 1,
                  }}
                />
              </Grid2>

              {/* Author Info and Update Button */}
              <Grid2 size={"grow"} columnSpacing={{ xs: 12, md: 4 }}>
                <Typography variant="h6" mb={2} color="text.primary">
                  Author Information
                </Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  mb={3}
                  p={2}
                  bgcolor="#f7f8fa"
                  borderRadius="8px"
                >
                  <Box ml={2}>
                    <Typography variant="h6" fontWeight="bold">
                      {blog?.author?.name || "Anonymous"}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleUpdate}
                  sx={{
                    mt: 2,
                    py: 1,
                    backgroundColor: "#1926d2",
                    "&:hover": { backgroundColor: "#155da1" },
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  Update Blog Post
                </Button>
              </Grid2>
            </Grid2>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

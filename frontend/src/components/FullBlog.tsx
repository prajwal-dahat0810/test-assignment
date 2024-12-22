import { Box, Typography, Avatar, Button, Grid2, Grow } from "@mui/material";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../lib/config";
export function FullBlog({ blog }: any) {
  console.log(blog.id);
  async function handleDelete() {
    try {
      const res = await axios.delete(
        `${BACKEND_URL}/api/v1/blog/posts/${blog.id}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.id) {
        navigate("/");
      }
    } catch (e) {
      alert(e);
    }
  }

  async function handleClick() {
    try {
      console.log(blog.content);
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/blog/in`,
        {
          content: blog.content,
        },
        { withCredentials: true }
      );
      if (!res.data.summary) {
        alert("Cannot get summary now try again");
      }
      setShowContent(res.data.summary);
    } catch (err) {
      alert(err);
    }
  }
  const date = new Date(blog.createdAt);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "1"); // Months are zero-indexed
  const day = String(date.getUTCDate()).padStart(2, "0");
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState("");

  return (
    <Box
      sx={{
        my: 10,
      }}
    >
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          justifyContent: "center",
          px: { xs: 2, sm: 4 },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "2fr 1fr" },
            gap: 4,
            width: "100%",
            maxWidth: "lg",
          }}
        >
          <Box
            sx={{
              maxWidth: "40rem",
              gridColumn: { xs: "1 / span 1" },
            }}
          >
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              {blog.title}
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              {blog.content}
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ mt: 3 }}
            >
              {`Posted on ${year}-${month}-${day}`}
            </Typography>
          </Box>

          <Box
            sx={{
              p: 2,
              border: "2px solid #28a745",
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                justifyContent: "flex-start",
              }}
            >
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => {
                  navigate("/update/" + blog.id);
                }}
              >
                Edit
              </Button>
              <Button
                onClick={handleDelete}
                size="small"
                variant="contained"
                color="error"
              >
                Delete
              </Button>
            </Box>
            <Typography variant="h6" fontWeight="bold" mt={2}>
              Summary
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mt: 3,
                p: 2,
                border: "1px dashed #f44336",
                borderRadius: 1,
              }}
            >
              {showContent === ""
                ? "Click on  Button to get summary..."
                : showContent}
            </Typography>
          </Box>

          {/* Footer Button */}
          <Grid2
            gridColumn={{ xs: "1/span 1", sm: "2 / span 1" }}
            style={{
              justifySelf: "flex-start",
              //   mt: { xs: 4, sm: 0 },
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClick}
              //   sx={{
              //     gridColumn: { xs: "1 / span 1", sm: "2 / span 1" },
              //     justifySelf: "flex-start",
              //     mt: { xs: 4, sm: 0 },
              //   }}
            >
              Summary
            </Button>
          </Grid2>
        </Box>
      </Box>
    </Box>
  );
}

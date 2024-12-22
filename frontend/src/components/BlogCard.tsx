import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router";
export interface blogCardProps {
  title: string;
  content: string;
  createdAt: string;
  id: string;
}
function BlogPostCard({ title, content, createdAt, id }: blogCardProps) {
  const date = new Date(createdAt);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "1"); // Months are zero-indexed
  const day = String(date.getUTCDate()).padStart(2, "0");
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/post/${id}`)}>
      <Box
        key={id}
        sx={{
          padding: "16px",
          borderBottom: "1px solid",
          borderColor: "slate.200",
          minWidth: "20rem",
          paddingX: "15px",
          cursor: "pointer",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Avatar */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          ></Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              paddingLeft: "8px",
              fontWeight: "200",
            }}
          >
            <Box
              sx={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                backgroundColor: "slate.500",
              }}
            />
          </Box>

          {/* Date */}
          <Box
            sx={{
              fontWeight: "300", // Matches font-thin

              color: "slate.400",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {`${year}-${month}-${day}`}
          </Box>
        </Box>

        <Typography variant="h6" sx={{ paddingTop: "12px", fontWeight: "600" }}>
          {title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontWeight: "200",
          }}
        >
          {content.length > 100 ? content.slice(0, 100) + "..." : content}
        </Typography>

        {/* Reading Time */}
        <Typography
          variant="body2"
          sx={{
            fontWeight: "300", // Matches font-thin
            paddingTop: "16px",
            color: "slate.400",
          }}
        >
          {`${Math.ceil(content.length / 100)} minute(s) read`}
        </Typography>
      </Box>
    </div>
  );
}

export default BlogPostCard;

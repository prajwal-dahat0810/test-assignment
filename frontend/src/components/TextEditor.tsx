import { Box, TextareaAutosize, Typography } from "@mui/material";
import { ChangeEvent } from "react";

export function TextEditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <Box
      sx={{
        width: "100%",
        mt: 2,
        mb: 4,
        border: "1px solid",
        borderColor: "grey.200",
        borderRadius: "8px",
        bgcolor: "grey.50",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 2,
          bgcolor: "white",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
        }}
      >
        <Typography component="label" sx={{ display: "none" }}>
          Publish post
        </Typography>

        <TextareaAutosize
          onChange={onChange}
          id="editor"
          minRows={8}
          placeholder="Write an article..."
          required
          style={{
            width: "100%",
            padding: "12px",
            outline: "none",
            fontSize: "1rem",
            border: "none",
            color: "#1A202C",
            backgroundColor: "white",
            resize: "none",
          }}
        />
      </Box>
    </Box>
  );
}

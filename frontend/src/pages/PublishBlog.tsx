import { useState } from "react";
import { TextEditor } from "../components/TextEditor";
import { Alert, Box, Button, InputBase, Snackbar } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { BACKEND_URL } from "../lib/config";

export const PublishBlog = () => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const [alertVisible, setAlertVisible] = useState(false);
  async function handlePublish() {
    if (!title || !description) {
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 2000);
      return;
    } else {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog/posts`,
        {
          title,
          content: description,
        },
        {
          withCredentials: true,
        }
      );

      if (!response.data.id) {
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 5000);
        setTimeout(() => navigate("/signin"), 5100);
        return;
      }
      navigate(`/post/${response.data.id}`);
    }
  }
  return (
    <Box>
      <Snackbar open={alertVisible} autoHideDuration={2000}>
        <Alert severity="success">
          Input is Empty! Please add a title or description and try submitting
          again.
        </Alert>
      </Snackbar>

      <Box sx={{ display: "flex", justifyContent: "center", pt: 8 }}>
        <Box sx={{ maxWidth: "1200px", width: "100%", px: 5 }}>
          <InputBase
            required
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              bgcolor: "grey.50",
              outline: "none",
              color: "grey.800",
              fontSize: "1.25rem",
              borderRadius: "8px",
              padding: "10px",
              width: "100%",
              mb: 3,
              "&:focus-within": { borderColor: "blue.500" },
              "&:disabled": { bgcolor: "grey.100" },
            }}
          />
          <TextEditor onChange={(e) => setDescription(e.target.value)} />

          <Button
            variant="contained"
            color="primary"
            onClick={handlePublish}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              px: 1.4,
              mt: 3,
              py: 0.6,
              fontSize: "15px",
            }}
          >
            Publish Post
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  CircularProgress,
  Typography,
  Link,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { BACKEND_URL } from "../lib/config";
import axios from "axios";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { isLogin } from "../store/atoms/isLogin";
export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInput, setPostInput] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [LoggedIn, setLoggedIn] = useRecoilState(isLogin);
  const [btnLoading, setBtnLoading] = useState(false);
  async function sendRequest(event: any) {
    try {
      if (postInput.email === "" && postInput.password === "") {
        alert("Please enter correct Inputs");
      } else {
        setBtnLoading(true);
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/user/${
            type === "signin" ? "signin" : "signup"
          }`,
          postInput,
          { withCredentials: true }
        );

        if (!response.data.token) {
          setBtnLoading(false);
          alert(response.data.message);
        } else {
          const jwt = response.data.token;
          console.log(jwt);
          setBtnLoading(false);

          setLoggedIn(true);
          navigate("/");
        }
      }
    } catch (e: any) {
      setBtnLoading(false);
      alert(e.response.data.message);
      return;
    }
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      setBtnLoading(() => false);
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [btnLoading]);

  return (
    <Box className="h-screen flex justify-center  flex-col">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="flex justify-center "
      >
        <Box
          alignItems={"center"}
          justifyContent={"center"}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "23rem",
          }}
        >
          <Box sx={{ px: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Create an account
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", fontWeight: "bold" }}
            >
              {type === "signup"
                ? "Already have an account?"
                : "Don't have an account?"}
              <Link
                href={type === "signin" ? "/signup" : "/signin"}
                sx={{ ml: 1, textDecoration: "underline" }}
              >
                {type === "signin" ? "Sign up" : "Sign in"}
              </Link>
            </Typography>
          </Box>
          <Box sx={{ pt: 3 }}>
            {type === "signup" && (
              <TextField
                label="Name"
                variant="outlined"
                placeholder="Prajwal..."
                fullWidth
                margin="normal"
                onChange={(e) => {
                  setPostInput({ ...postInput, userName: e.target.value });
                }}
              />
            )}
            <TextField
              label="Email"
              variant="outlined"
              placeholder="johndoe@gmail.com"
              fullWidth
              margin="normal"
              onChange={(e) => {
                setPostInput({ ...postInput, email: e.target.value });
              }}
            />
            <TextField
              label="Password"
              variant="outlined"
              placeholder="das#hf@lk4"
              fullWidth
              margin="normal"
              type="password"
              onChange={(c) => {
                setPostInput({ ...postInput, password: c.target.value });
              }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              onClick={sendRequest}
              disabled={btnLoading}
            >
              {btnLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : type === "signup" ? (
                "Sign up"
              ) : (
                "Sign in"
              )}
            </Button>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: "medium" }}>
              Ensure that these requirements are met:
            </Typography>
            <List sx={{ mt: 1 }}>
              <div>Password 8 characters (and up to 18 characters)</div>
              <div>At least one lowercase character</div>
            </List>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

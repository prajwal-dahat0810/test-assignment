import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography/Typography";
import Cookies from "js-cookie";
import AppBar from "@mui/material/AppBar";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { isLogin } from "../store/atoms/isLogin";
import { IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router";
import { BACKEND_URL } from "../lib/config";
import axios from "axios";

export const NavBar = () => {
  async function handleLogout() {
    const response = await axios.get(`${BACKEND_URL}/api/v1/user/logout`, {
      withCredentials: true,
    });
    if (response.data.message) {
      window.location.href = "/";
    }
  }

  const auth = useRecoilValue(isLogin);
  console.log(auth);
  console.log("get cookie", Cookies.get("messagesUtk"));
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth) navigate("/signin");
  });
  return (
    <AppBar
      position="static"
      style={{
        width: "100%",
      }}
    >
      <Toolbar
        style={{
          width: "full",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        variant="dense"
      >
        <Typography variant="h6" color="inherit" component="div">
          Blogging
        </Typography>
        {auth ? (
          <div style={{ display: "flex", gap: "4px" }}>
            <div
              onClick={(e) => {
                navigate("/publish");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
                width={30}
                height={30}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <div onClick={handleLogout}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
                height={30}
                width={30}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
            </div>
          </div>
        ) : (
          "Login"
        )}
      </Toolbar>
    </AppBar>
  );
};

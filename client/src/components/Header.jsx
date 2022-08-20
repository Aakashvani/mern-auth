import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  // console.log(cookies);
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h3">APP</Typography>
          <Box sx={{ marginLeft: "auto" }}>
            {cookies.user ? (
              <Button onClick={() => removeCookie("user")}>
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontFamily: "sans-serif",
                  }}
                >
                  Logout
                </Link>
              </Button>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{
                    marginRight: 10,
                    textDecoration: "none",
                    color: "white",
                    fontFamily: "sans-serif",
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontFamily: "sans-serif",
                  }}
                >
                  Signup
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;

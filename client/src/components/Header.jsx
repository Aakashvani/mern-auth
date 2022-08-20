import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h3">APP</Typography>
          <Box sx={{ marginLeft: "auto" }}>
            {cookies.user ? (
              <Button onClick={() => removeCookie("user")}>
                <Link to="/">Logout</Link>
              </Button>
            ) : (
              <>
                <Link to="/login" style={{ marginRight: 10 }}>
                  Login
                </Link>
                <Link to="/signup">Signup</Link>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;

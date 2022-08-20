import React, { useState } from "react";
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";

const Header = () => {
  const [value, setValue] = useState();

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography variant="h3">APP</Typography>
          <Box sx={{ marginLeft: "auto" }}>
            <Tabs
              indicatorColor="secondary"
              onChange={(e, val) => setValue(val)}
              value={value}
              textColor="inherit"
            >
              <Tab label="LogIn" />
              <Tab label="SignUp" />
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;

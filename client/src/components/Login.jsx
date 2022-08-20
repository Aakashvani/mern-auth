import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState();
  const [cookies, setCookie] = useCookies(["user"]);

  const navigate = useNavigate();

  const handleForm = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = form;
      let payload;
      if (email && password) {
        payload = {
          email: email,
          password: password,
        };
      }

      let res = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let data = await res.json();
      // console.log(data.token, data.user.isAdmin, data.user.name);

      // setCookie(data?.token, data?.user?.isAdmin, data?.user?.name);
      if (data.token) {
        setCookie("user", {
          token: data.token,
          admin: data.user.isAdmin,
          name: data.user.name,
        });
        if (data.user.isAdmin === true) {
          return navigate("/admin");
        } else {
          navigate("/user");
        }
      }

      if (data.message) {
        return alert(data.message);
      }

      //   data.
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(cookies);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          width={300}
          marginLeft="auto"
          marginRight={"auto"}
          justifyContent="center"
          alignItems={"center"}
          display={"flex"}
          flexDirection={"column"}
        >
          <Typography variant="h4" fontFamily={"revert-layer"}>
            Login
          </Typography>

          <TextField
            id="email"
            variant="outlined"
            placeholder="Email"
            margin="normal"
            onChange={handleForm}
          />
          <TextField
            id="password"
            variant="outlined"
            placeholder="Password"
            margin="normal"
            onChange={handleForm}
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;

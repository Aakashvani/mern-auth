import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState();

  const navigate = useNavigate();

  const handleForm = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { name, email, password } = form;
      let payload;
      if (name && email && password) {
        payload = {
          name: name,
          email: email,
          password: password,
        };
      }

      let res = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let data = await res.json();
      // console.log(data);
      // console.log(res.status);

      if (res.status == 201) {
        console.log("first");
        alert(data.message);
        navigate("/login");
        console.log("second");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            SignUp
          </Typography>

          <TextField
            id="name"
            variant="outlined"
            placeholder="Name"
            margin="normal"
            onChange={handleForm}
          />
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
            SignUp
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Signup;

import React from "react";
import { useCookies } from "react-cookie";

const Welcome = () => {
  const [cookies, setCookie] = useCookies(["user"]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: " 100vh",
      }}
    >
      <h1>Welcome {cookies.user.name}</h1>
    </div>
  );
};

export default Welcome;

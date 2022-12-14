const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user-routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/api", router);

//MongoDb connection
const PORT = process.env.PORT || 8080;

mongoose
  .connect(
    "mongodb+srv://admin:bApXbrKhP1cVKclJ@cluster0.ajoeytx.mongodb.net/auth?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(PORT);
    console.log(`Listening on port ${PORT} && Database is connected!!!`);
  });

//password:- bApXbrKhP1cVKclJ

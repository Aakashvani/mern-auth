const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user-routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const path = require('path');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/api", router);

//-------------deployment --------------------
__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static("client/dist"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
    });
}
//-------------deployment --------------------


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

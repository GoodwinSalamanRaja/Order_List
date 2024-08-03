const express = require("express");

const app = express();

const cors = require("cors")
app.use(cors({origin:"*"}))
app.use(express.json())
app.use("/product",require("./router/products"))

app.listen(8080, (e) => {
  if (e) {
    console.log(`Failed to start server ${e}`);
  } else {
    console.log("server started successfully");
  }
});

const mongoose = require("mongoose");

const mongoDbUrl = "mongodb://localhost:27017/test";

mongoose
  .connect(mongoDbUrl)
  .then(() => {
    console.log(`${mongoDbUrl} connected successfully`);
  })
  .catch((error) => {
    console.log(`Failed to connect ${(mongoDbUrl, error)}`);
  });

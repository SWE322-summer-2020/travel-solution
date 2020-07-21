const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./Routes/userRouter");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// mount all routers
app.use("/user", userRouter);

app.listen(3000, () => {
  console.log("running on port 3000");
});

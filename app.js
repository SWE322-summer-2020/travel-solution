const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRouter = require("./Routes/userRouter");
const viewRouter = require("./Routes/viewRouter");
const storyRouter = require("./Routes/storyRouter");
const AppError = require("./Utils/appError");
const globalErrorHandler = require("./Controllers/errorController");

dotenv.config({ path: "./config.env" });
const app = express();

mongoose
  .connect(process.env.DB_STRING_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successfull");
  });

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "Views"));

// mount all routers
app.use("/", viewRouter);
app.use("/user", userRouter);
app.use("/story", storyRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`travel solution running on port: ${process.env.PORT}`);
});

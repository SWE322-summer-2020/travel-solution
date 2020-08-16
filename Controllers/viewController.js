const Story = require("./../Models/storyModel");
const catchAsyncError = require("./../Utils/catchAsyncError");

exports.overview = catchAsyncError(async (req, res, next) => {
  const stories = await Story.find();
  res.status(200).render("overview", {
    title: "A Website For Travel Lovers",
    stories: stories,
  });
});

exports.signUp = (req, res, next) => {
  res.status(200).render("signup", {
    title: "Sign Up",
  });
};

exports.registration = (req, res, next) => {
  res.status(200).render("registration", {
    title: "Registration Form",
  });
};

exports.login = (req, res, next) => {
  res.status(200).render("login", {
    title: "Login",
  });
};

exports.forgotPassword = (req, res, next) => {
  res.status(200).render("forgotPassword", {
    title: "Forgot Password",
  });
};

exports.resetPassword = (req, res, next) => {
  res.status(200).render("resetPassword", {
    title: "Reset Password",
  });
};

exports.postStory = (req, res, next) => {
  res.status(200).render("postStory", {
    title: "Post A Travel Story",
  });
};

exports.getPost = catchAsyncError(async (req, res, next) => {
  const story = await Story.find({ _id: req.params.id });
  console.log(story);
  res.status(200).render("story");
});

const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const DummyUser = require("./../Models/dummyUser");
const User = require("./../Models/userModel");
const catchAsyncError = require("./../Utils/catchAsyncError");
const Email = require("./../Utils/email");
const AppError = require("./../Utils/appError");

const sendJWT = (res, id) => {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });

  const cookieOption = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXP_IN),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOption.secure = true;

  res.cookie("jwt", token, cookieOption);
};

exports.verifyEmail = catchAsyncError(async (req, res, next) => {
  const dummyUser = await DummyUser.create(req.body);
  const verificationToken = dummyUser.getVerifyToken();

  const url = `${req.protocol}://${req.get(
    "host"
  )}/registration/${verificationToken}`;
  console.log(url);
  try {
    await new Email(dummyUser, url).verifyEmailAddress();
  } catch (err) {
    await DummyUser.deleteOne({ verificationToken: verificationToken });
    return next(
      new AppError(
        "There was a problem sending the email. Please try again later!",
        500
      )
    );
  }

  res.status(200).json({
    status: "success",
  });
});

exports.signUp = catchAsyncError(async (req, res, next) => {
  const token = req.params.token;
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  console.log(hashedToken);
  const dummyUser = await DummyUser.findOne({
    verificationToken: hashedToken,
  });

  const filterReqObj = (reqBody, ...allowedFields) => {
    const filteredObj = {};
    Object.keys(reqBody).forEach((el) => {
      if (allowedFields.includes(el)) filteredObj[el] = reqBody[el];
    });
    return filteredObj;
  };

  const afterFilteringReqBody = filterReqObj(
    req.body,
    "username",
    "password",
    "confirmPassword",
    "bio",
    "avatar",
    "name"
  );
  afterFilteringReqBody.email = dummyUser.email;
  let newUser = await User.create(afterFilteringReqBody);
  sendJWT(res, newUser.id);
});

exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return new AppError("Please provide email and password", 400);
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password)))
    return new AppError("Incorrect email or password");

  sendJWT(res, user.id);
  res.status(200).json({
    status: "success",
    user,
  });
});

// exports.forgotPassword = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) return next(new AppError("No user found with that email", 404));

//     const resetToken = user.createResetToken();
//     await user.save({ validateBeforeSave: false });
//   } catch (err) {}
// };

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  console.log(req.body.email);

  if (!user) {
    return next(new AppError("No user found with that email", 404));
  }

  const resetToken = await user.createResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/reset-password/${resetToken}`;
  console.log(resetUrl);

  try {
    await new Email(user, resetUrl).passwordReset();
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExp = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const token = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetTokenExp: { $gt: Date.now() },
  });
  if (!user) return next(new AppError("Token is invalid or has expired", 400));

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExp = undefined;
  await user.save({ validateBeforeSave: false });
  sendJWT(res, user.id);
});

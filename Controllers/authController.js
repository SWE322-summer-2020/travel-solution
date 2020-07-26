const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const DummyUser = require("./../Models/dummyUser");
const User = require("./../Models/userModel");
const catchAsyncError = require("./../Utils/catchAsyncError");
const Email = require("./../Utils/email");

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
  console.log(verificationToken);

  // SEND THE EMAIL
  const url = `${req.protocol}://${req.get(
    "host"
  )}/registration/${verificationToken}`;
  console.log(url);

  new Email(dummyUser, url);

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

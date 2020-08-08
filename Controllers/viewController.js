exports.overview = (req, res, next) => {
  res.status(200).render("base", {
    title: "A Website For Travel Lovers",
  });
};

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

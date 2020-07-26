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

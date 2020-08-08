const login = async (email, password) => {
  try {
    console.log(email, password);
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/user/login",
      data: {
        email,
        password,
      },
    });
    if (res.data.status === "success") {
      window.setTimeout(() => {
        location.assign("/");
      }, 1000);
    }
  } catch (err) {
    alert("error", err.response.data.message);
  }
};

document.querySelector(".form.form--login").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  login(email, password);
});

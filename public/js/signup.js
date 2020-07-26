async function sendVerifyEmail(email) {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/user/sign-up",
      data: {
        email,
      },
    });
    if (res.data.status === "success") {
      alert(
        "Confirmation email has been sent to your email address. Please confirm your account"
      );
      location.assign("/");
    }
  } catch (err) {
    alert(err.response.data.message);
  }
}

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;

  sendVerifyEmail(email);
});

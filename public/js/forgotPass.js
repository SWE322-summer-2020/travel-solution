const forgotPassword = async function(email) {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/user/forgot-password",
      data: {
        email,
      },
    });

    if (res.data.status === "success") {
      alert("Password reset email has been sent to your email address");
      location.assign("/");
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  forgotPassword(email);
});

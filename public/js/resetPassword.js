const token = window.location.pathname.split("/")[2];
async function resetPassword(password, confirmPassword) {
  try {
    const res = await axios({
      method: "POST",
      url: `http://127.0.0.1/user/reset-password/${token}`,
      data: {
        password,
        confirmPassword,
      },
    });
    if (res.data.status === "success") {
      alert("Password updated successfully");
      location.asign("/");
    }
  } catch (err) {
    alert(err);
  }
}

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password != confirmPassword) {
    return alert("Password did not matched");
  }

  resetPassword(password, confirmPassword);
});

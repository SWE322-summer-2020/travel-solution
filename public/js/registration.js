const token = window.location.pathname.split("/")[2];

async function registration(name, password, confirmPassword, username, bio) {
  try {
    const res = await axios({
      method: "POST",
      url: `http://127.0.0.1:3000/user/sign-up/${token}`,
      data: {
        name,
        password,
        confirmPassword,
        username,
        bio,
      },
    });
    if (res.data.status === "success") alert("Successfully registered");
  } catch (err) {
    alert(err.response.data.message);
  }
}

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const username = document.getElementById("username").value;
  const bio = document.getElementById("bio").value;

  registration(name, password, confirmPassword, username, bio);
});

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const username = document.getElementById("username").value;
  const bio = document.getElementById("bio").value;

  registration(name, password, confirmPassword, username, bio);
});

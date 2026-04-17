import "../../admin/styles/index.css";

const form = document.querySelector("form");
const nameInput = document.getElementById("name");
const passwordInput = document.getElementById("type");

const errorName = document.querySelectorAll(".text-warning")[0];
const errorPassword = document.querySelectorAll(".text-warning")[1];

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  errorName.style.display = "none";
  errorPassword.style.display = "none";

  const login = nameInput.value.trim();
  const password = passwordInput.value.trim();

  try {
    const res = await fetch("http://localhost:4545/users");
    const users = await res.json();

    const user = users.find((u) => u.login === login);

    if (!user) {
      errorName.style.display = "block";
      nameInput.value = "";
      passwordInput.value = "";
      return;
    }

    if (user.password !== password) {
      errorPassword.style.display = "block";
      nameInput.value = "";
      passwordInput.value = "";
      return;
    }
    document.cookie = "auth=true; path=/";
    window.location.href = "table.html";
  } catch (err) {
    console.log(err);
  }
});

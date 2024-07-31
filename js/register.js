const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value; 
  const password = document.querySelector("#password").value; 
  const confirm_password = document.querySelector("#confirm_password").value; 


  if (!name) {
    alert("Please enter your name");
    return;
  }
  if (name.length < 3) {
    alert("Name should be greater than 2 characters");
    return;
  }
  if (!email) {
    alert("Please enter your email");
    return;
  }
  let users = JSON.parse(localStorage.getItem("users")) || []; 
  let user = users.find((user) => user.email === email);
  if (user) {
    alert("Email already exists");
    return;
  }
  if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
    alert("Please enter a valid email");
    return;
  }
  if (!password) {
    alert("Please enter your password");
    return;
  }
  if (password.length < 8) {
    alert("Password should be greater than 8 characters");
    return;
  }
  if (!confirm_password) {
    alert("Please confirm your password");
    return;
  }
  if (password !== confirm_password) {
    alert("Password and confirm password should be same");
    return;
  }


  const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

  const data = {
    id,
    name,
    email,
    password,
  };
  let users_data = JSON.parse(localStorage.getItem("users")) || [];
  users_data.push(data);
  localStorage.setItem("users", JSON.stringify(users_data));

  window.location.href = "register_success.html";
});


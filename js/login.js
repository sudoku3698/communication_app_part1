const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault(); 

  const email = document.querySelector("#email").value; 
  const password = document.querySelector("#password").value; 

  if (!email) { 
    alert("Please enter your email"); 
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

  const users = JSON.parse(localStorage.getItem("users")) || []; 
  const user = users.find(
    (user) => user.email === email && user.password === password 
  );

  if (user) { 
    localStorage.setItem("loggedInUser", JSON.stringify(user)); 
    window.location.href = "login_success.html"; 
  } else {
    alert("Invalid email or password"); 
  }
});


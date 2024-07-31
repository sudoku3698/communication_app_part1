$("body").on("click", 'button[data-toggle="modal"]', function () {
  let id = $(this).data("id");
  let user = users.find((user) => user.id === id);
  $("#editModal").data("id", id);
  $("#name").val(user.name);
  if (JSON.parse(localStorage.getItem('loggedInUser'))?.email === user.email) {
    $("#email").val(user.email).attr('disabled', true);
  } else {
    $("#email").val(user.email).attr('disabled', false);
  }
});

function saveUser() {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let id = $("#editModal").data("id");
  let name = $("#name").val().trim();
  let email = $("#email").val().trim();
  if (!name || !email) {
    alert("Please fill all the details");
    return;
  }
  if (name.length < 3) {
    alert("Name should be greater than 2 characters");
    return;
  }
  if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
    alert("Please enter a valid email");
    return;
  }
  let user = users.find((user) => user.id === id);
  let sameEmailUser = users.find((user) => user.email === email && user.id !== id);
  if (sameEmailUser) {
    alert("Email already exists");
    return;
  }
  user.name = name;

  if (!JSON.parse(localStorage.getItem('loggedInUser'))?.email === user.email) {
    user.email = email;
  }
  localStorage.setItem("users", JSON.stringify(users));
  $("#editModal").modal("hide");
  window.location.reload();
}

function deleteUser(id) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    Swal.fire({
      title: 'Are you sure you want to delete this user?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        users.splice(index, 1);
        localStorage.setItem("users", JSON.stringify(users));
        window.location.reload();
      }
    });
  }
}


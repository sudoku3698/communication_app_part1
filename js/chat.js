let chats = JSON.parse(localStorage.getItem("chats")) || [];


function sendChatMessage() {
  let message = document.getElementById("chat-input").value;

  if (message) {
    document.getElementById("chat-input").value = "";

    const date = new Date().toLocaleString();

    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    chats.push({
      message: message,
      sender: user.email,
      time: date,
      user: JSON.stringify(user),
    });

    localStorage.setItem("chats", JSON.stringify(chats));

    displayChatMessages();

    document
      .getElementById("chat-messages")
      .scrollTop = document.getElementById("chat-messages").scrollHeight;
  }
}


function displayChatMessages() {
  let chatMessages = document.getElementById("chat-messages");

  chatMessages.innerHTML = "";

  let chats = JSON.parse(localStorage.getItem("chats")) || [];

  chats.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

  chats.forEach((chat) => {
    let messageDiv = document.createElement("div");

    messageDiv.classList.add(
      "chat-message",
      "bg-light",
      "px-5",
      "py-3",
      "mb-3",
      "rounded"
    );

    let userDetails = JSON.parse(chat.user);

    if (
      JSON.parse(localStorage.getItem("loggedInUser")).email ===
      userDetails.email
    ) {
      messageDiv.classList.add("align-self-end");
    } else {
      messageDiv.classList.add("align-self-start");
    }

    let messageText = document.createElement("p");
    messageText.classList.add("mb-0");
    messageText.textContent = chat.message;

    messageDiv.appendChild(messageText);

    let timeUserDiv = document.createElement("div");
    timeUserDiv.classList.add("d-flex", "justify-content-between");

    let timeText = document.createElement("small");

    let options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };


    timeText.textContent = chat.time

    let userText = document.createElement("small");

    userText.textContent = userDetails.name;

    timeUserDiv.appendChild(timeText);
    timeUserDiv.appendChild(userText);

    messageDiv.appendChild(timeUserDiv);

    chatMessages.appendChild(messageDiv);
  });
}

window.onload = function () {
  displayChatMessages();
};


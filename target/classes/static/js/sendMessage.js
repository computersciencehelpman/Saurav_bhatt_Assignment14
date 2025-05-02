
    async function showAlertPrompt() {
      return new Promise(resolve => {
        const name = prompt("Enter your name:");
        if (name) sessionStorage.setItem("currentUser", name);
        resolve(name);
      });
    }

    function formatTime(timestamp) {
      if (!timestamp) return "";
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    async function loadMessages() {
      const currentChannel = document.getElementById("channel").value;
      const currentUser = sessionStorage.getItem("currentUser") || "anonymous";

      const response = await fetch(`/messages/all/${currentChannel}`);
      const messages = await response.json();

      const display = document.getElementById("messageDisplay");
      display.innerHTML = "";

      messages.forEach(msg => {
        const isSender = msg.fromUser === currentUser;

        const wrapper = document.createElement("div");
        wrapper.className = "message-column " + (isSender ? "sent" : "received");

        const bubble = document.createElement("div");
        bubble.className = "message-bubble " + (isSender ? "sent" : "received");

        const avatar = document.createElement("div");
        avatar.className = "avatar";
        avatar.textContent = msg.fromUser;

        const text = document.createElement("div");
        text.textContent = msg.content;

        const time = document.createElement("div");
        time.className = "timestamp";
        time.textContent = formatTime(msg.timestamp);

        if (isSender) {
          bubble.appendChild(text);
          bubble.appendChild(time);
          wrapper.appendChild(bubble);
          wrapper.appendChild(avatar);
        } else {
          wrapper.appendChild(avatar);
          bubble.appendChild(text);
          bubble.appendChild(time);
          wrapper.appendChild(bubble);
        }

        display.appendChild(wrapper);
      });

      display.scrollTop = display.scrollHeight;
    }

    async function sendMessage() {
      const messageBox = document.getElementById("messageBox");
      const currentUser = sessionStorage.getItem("currentUser");
      const currentChannel = document.getElementById("channel").value;
      const message = messageBox.value.trim();

      if (!message) return;

      const payload = {
        text: message,
        fromUser: currentUser,
        toUser: ""
      };

      await fetch(`/messages/send/${currentChannel}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      messageBox.value = "";
      loadMessages();
    }

    document.addEventListener("DOMContentLoaded", async function () {
      let currentUser = sessionStorage.getItem("currentUser");
      if (!currentUser) {
        currentUser = await showAlertPrompt();
        if (!currentUser) return;
      }

      document.getElementById("currentUserDisplay").textContent = "Logged in as: " + currentUser;

      document.getElementById("sendButton").addEventListener("click", sendMessage);
      document.getElementById("messageBox").addEventListener("keydown", e => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      });

      loadMessages();
      setInterval(loadMessages, 1000); 
    });

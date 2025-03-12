const messageBox = document.getElementById("messageBox");
const sendButton = document.getElementById("sendButton");
const messageDisplay = document.getElementById("messageDisplay");

let currentChannel = "general"; // Default channel

async function sendMessage() {
    let message = messageBox.value.trim();
    if (message !== "") {
        console.log(`Sending message to: ${currentChannel}`); // Debugging

        await fetch(`/messages/send/${currentChannel}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "text": message }) 
        });

        console.log(`Message sent to ${currentChannel}: ${message}`); // Debugging
        messageBox.value = ""; 
        loadMessages(); // Reload after sending
    } else {
        console.log("Message is empty, not sending.");
    }
}

async function loadMessages() {
    console.log(`Fetching messages for: ${currentChannel}`); // Debugging
    const response = await fetch(`/messages/all/${currentChannel}`);
    const messages = await response.json();
    console.log(`Messages fetched for ${currentChannel}:`, messages); // Debugging

    messageDisplay.innerHTML = "";
    messages.forEach(msg => {
        let messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.textContent = msg.text;
        messageDisplay.appendChild(messageElement);
    });

    messageDisplay.scrollTop = messageDisplay.scrollHeight;
}

function switchChannel(channel) {
    console.log(`Switching to channel: ${channel}`); // Debugging
    currentChannel = channel; // Update currentChannel
    loadMessages(); // Reload messages for the selected channel
}



sendButton.addEventListener("click", sendMessage);
messageBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});

function switchChannel(channel) {
    console.log(`Switching to channel: ${channel}`); // Debugging
    currentChannel = channel;
    loadMessages();
}

window.onload = loadMessages;
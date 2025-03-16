const messageBox = document.getElementById("messageBox");
const sendButton = document.getElementById("sendButton");
const messageDisplay = document.getElementById("messageDisplay");

if (!messageBox || !sendButton || !messageDisplay) {
    console.error("Missing required DOM elements.");
}

let currentChannel = localStorage.getItem("currentChannel") || "channel1"; // Default to an actual channel

window.onload = function () {
        let channelFromTemplate = /*[[${channel}]]*/ "channel1"; // Default to channel1
        currentChannel = channelFromTemplate.trim();
        localStorage.setItem("currentChannel", currentChannel);
        console.log("Loaded channel:", currentChannel);
        loadMessages();
    };

async function sendMessage() {
    let message = messageBox.value.trim();
    if (message === "") return;

    console.log(`Sending message to: ${currentChannel}`);

    try {
        const response = await fetch(`/messages/send/${currentChannel}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "text": message })
        });

        if (!response.ok) {
            throw new Error(`Failed to send message. Status: ${response.status}`);
        }

        appendMessage(message);
        messageBox.value = "";
        messageDisplay.scrollTop = messageDisplay.scrollHeight;
    } catch (error) {
        console.error("Error sending message:", error.message);
    }
}

async function loadMessages() {
    console.log(`Fetching messages for: ${currentChannel}`);

    try {
        const response = await fetch(`/messages/all/${currentChannel}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch messages. Status: ${response.status}`);
        }

        const messages = await response.json();
        console.log(`Messages for ${currentChannel}:`, messages);

        // Clear previous messages and only show messages for the current channel
        messageDisplay.innerHTML = "";
        messages.forEach(msg => {
            if (msg.channel === currentChannel) {  // Ensure correct channel filtering
                appendMessage(msg.text);
            }
        });

        messageDisplay.scrollTop = messageDisplay.scrollHeight;
    } catch (error) {
        console.error("Error loading messages:", error.message);
    }
}

function appendMessage(text) {
    let messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.textContent = text;
    messageDisplay.appendChild(messageElement);
}

function switchChannel(channel) {
    console.log(`Switching to channel: ${channel}`);

    currentChannel = channel;
    localStorage.setItem("currentChannel", channel);

    // Navigate to the correct URL
    window.location.href = `/${channel}`;
}

sendButton.addEventListener("click", sendMessage);
messageBox.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});

window.addEventListener("load", function () {
    let savedChannel = localStorage.getItem("currentChannel");
    if (savedChannel) {
        currentChannel = savedChannel;
    }

    console.log("Loaded channel:", currentChannel);
    loadMessages();
});

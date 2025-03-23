document.addEventListener("DOMContentLoaded", function () {
    const messageBox = document.getElementById("messageBox");
    const sendButton = document.getElementById("sendButton");
    const messageDisplay = document.getElementById("messageDisplay");
    const channelElement = document.getElementById("channel");

    // ✅ Ensure all required elements exist
    if (!messageBox || !sendButton || !messageDisplay || !channelElement) {
        console.error("❌ Required elements not found!");
        return;
    }
	if (typeof sendMessage !== "function") {
        console.error("❌ sendMessage() is not defined!");
    } else {
        console.log("✅ sendMessage() is properly loaded.");
    }
    let currentChannel = channelElement.value.trim();
    console.log(`✅ Resolved channel: ${currentChannel}`);

    // ✅ If the channel is missing, show an error
    if (!currentChannel) {
        console.error("❌ Error: Channel name is missing!");
    }

    // ✅ Store channel in local storage
    localStorage.setItem("currentChannel", currentChannel);
    loadMessages(currentChannel);

    // ✅ Attach event listeners
    sendButton.addEventListener("click", sendMessage);
    messageBox.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });

    console.log("✅ Event listeners attached successfully.");
});

// ✅ Function to switch channels
function switchChannel(channel) {
    console.log(`Switching to channel: ${channel}`);
    localStorage.setItem("currentChannel", channel);
    window.location.href = `/${channel}`;
}

function sendMessage() {
    const messageBox = document.getElementById("messageBox");
    const messageDisplay = document.getElementById("messageDisplay");
    const channelElement = document.getElementById("channel");

    if (!messageBox || !messageDisplay || !channelElement) {
        console.error("❌ Required elements not found!");
        return;
    }

    const message = messageBox.value.trim();
    if (!message) {
        console.warn("⚠️ Cannot send an empty message.");
        return;
    }

    const currentChannel = channelElement.value.trim();
    console.log(`📨 Sending message to ${currentChannel}: "${message}"`);

    // Simulating message sending
    const messageElement = document.createElement("p");
    messageElement.textContent = message;
    messageDisplay.appendChild(messageElement);

    // Clear the input box
    messageBox.value = "";
	}
	
	async function loadMessages(currentChannel) {
    console.log(`Fetching messages for: ${currentChannel}`); // Debugging
    
    const response = await fetch(`/messages/all/${currentChannel}`);
    const data = await response.json();

    console.log("📥 Raw API response:", JSON.stringify(data, null, 2)); // Debugging

    // ✅ Ensure the response contains the 'messages' array
    const messages = data; // Extract messages correctly
    if (!Array.isArray(messages)) {
        console.error("❌ Error: 'messages' property is not an array!", data);
        return; // Stop execution if it's not an array
    }

    messageDisplay.innerHTML = ""; // Clear previous messages

    messages.forEach(msg => {
        let messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.textContent = msg.text;
        messageDisplay.appendChild(messageElement);
    });

    // Auto-scroll to the bottom
    messageDisplay.scrollTop = messageDisplay.scrollHeight;
	}
	console.log("📡 Current channel value:", document.getElementById("channel").value);
	

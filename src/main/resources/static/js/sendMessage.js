document.addEventListener("DOMContentLoaded", function () {
    const channelElement = document.getElementById("channel");

    if (!channelElement) {
        console.error("❌ Error: Channel element not found!");
        return;
    }

    let currentChannel = channelElement.value.trim();
    
    if (!currentChannel) {
        console.warn("⚠️ No channel found in hidden input! Using 'channel1' as default.");
        currentChannel = "channel1"; // Fallback default
        channelElement.value = currentChannel; // Set it in the hidden input
    }

    console.log(`✅ Resolved channel: ${currentChannel}`);
    localStorage.setItem("currentChannel", currentChannel);

    loadMessages();
});

// ✅ Function to switch channels
function switchChannel(channel) {
    console.log(`🔄 Switching to channel: ${channel}`);

    // Update hidden input field dynamically
    const channelElement = document.getElementById("channel");
    if (channelElement) {
        channelElement.value = channel;
    } else {
        console.warn("⚠️ Hidden channel input not found!");
    }

    // Store in local storage and navigate
    localStorage.setItem("currentChannel", channel);
    window.location.href = `/${channel}`;
}

document.addEventListener("DOMContentLoaded", function () {
    const sendButton = document.getElementById("sendButton");
    const messageBox = document.getElementById("messageBox");

    if (sendButton) {
        sendButton.addEventListener("click", sendMessage);
    }

    if (messageBox) {
        messageBox.addEventListener("keydown", function (event) {
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault(); // Prevents new line in textarea
                sendMessage();
            }
        });
    }
});

async function sendMessage() {
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

    const currentChannel = localStorage.getItem("currentChannel");
    const currentUser = localStorage.getItem("currentUser") || "you"; // ✅ Ensure a stored user

    console.log(`📨 Sending message to ${currentChannel}: "${message}" | From: ${currentUser}`);

    // Create message object
    const messagePayload = { text: message, fromUser: currentUser };

    try {
        const response = await fetch(`/messages/send/${currentChannel}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messagePayload)
        });

        if (!response.ok) {
            throw new Error(`❌ Failed to send message: ${response.status}`);
        }

        console.log("✅ Message sent successfully!");

        // ✅ Create a message bubble immediately
        const messageElement = document.createElement("div");
        messageElement.classList.add("message-bubble", "sent");
        messageElement.innerText = `${currentUser}: ${message}`; // ✅ Fix applied
        messageDisplay.appendChild(messageElement);

        // Auto-scroll to bottom
        messageDisplay.scrollTop = messageDisplay.scrollHeight;

        // Clear the input box
        messageBox.value = "";

        // Refresh messages after sending
        await loadMessages();
    } catch (error) {
        console.error("❌ Error sending message:", error);
    }
}

async function loadMessages() {
    let currentChannel = localStorage.getItem("currentChannel");
    const currentUser = localStorage.getItem("currentUser") || "you"; // ✅ Ensure user matches sent messages

    console.log(`🔍 Fetching messages for: "${currentChannel}"`);

    if (!currentChannel || currentChannel.trim() === "") {
        console.error("❌ Error: Channel name is missing! Aborting request.");
        return;
    }

    try {
        const response = await fetch(`/messages/all/${currentChannel}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        console.log("📥 Messages received:", JSON.stringify(data, null, 2));

        if (!Array.isArray(data)) {
            console.error("❌ Error: Expected an array but got:", data);
            return;
        }

        const messageDisplay = document.getElementById("messageDisplay");
        messageDisplay.innerHTML = ""; // Clear previous messages

        data.forEach(msg => {
            let messageElement = document.createElement("div");
            messageElement.classList.add("message-bubble");

            // Compare against stored user ID
            if (msg.fromUser === currentUser) {
                messageElement.classList.add("sent"); // ✅ Blue bubble for sender
            } else {
                messageElement.classList.add("received"); // ✅ Gray bubble for others
            }

            messageElement.innerText = `${msg.fromUser}: ${msg.text}`; // ✅ Fix applied
            messageDisplay.appendChild(messageElement);
        });

        // Auto-scroll to bottom
        messageDisplay.scrollTop = messageDisplay.scrollHeight;
    } catch (error) {
        console.error("❌ Failed to load messages:", error);
    }
}

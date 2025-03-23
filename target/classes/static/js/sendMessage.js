document.addEventListener("DOMContentLoaded", function () {
    const channelElement = document.getElementById("channel");

    if (!channelElement) {
        console.error("❌ Error: Channel element not found!");
        return;
    }

    let currentChannel = channelElement.value.trim();
    
    if (!currentChannel) {
        console.error("❌ Error: No channel found in hidden input!");
        return;
    }

    console.log(`✅ Resolved channel: ${currentChannel}`);
    localStorage.setItem("currentChannel", currentChannel);

    // Load messages after confirming the channel
    loadMessages(currentChannel);
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
    console.log(`🔍 Fetching messages for: "${currentChannel}"`); // Debugging

    if (!currentChannel || currentChannel.trim() === "") {
        console.error("❌ Error: Channel name is missing! Aborting request.");
        return; // Stop execution
    }

    try {
        const response = await fetch(`/messages/all/${currentChannel}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("📥 Raw API response:", JSON.stringify(data, null, 2));

        if (!Array.isArray(data)) {
            console.error("❌ Error: Expected an array but got:", data);
            return;
        }

        messageDisplay.innerHTML = ""; // Clear previous messages

        data.forEach(msg => {
            let messageElement = document.createElement("div");
            messageElement.classList.add("message");
            messageElement.textContent = msg.text;
            messageDisplay.appendChild(messageElement);
        });

        // Auto-scroll to the bottom
        messageDisplay.scrollTop = messageDisplay.scrollHeight;
    } catch (error) {
        console.error("❌ Failed to load messages:", error);
    }
	}
	
	console.log("📡 Current channel value:", document.getElementById("channel").value);
	
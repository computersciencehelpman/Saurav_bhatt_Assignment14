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

    let currentChannel = channelElement.value.trim();
    console.log("✅ Hidden input value:", channelElement.value);
    console.log("✅ Resolved channel:", currentChannel);

    // ✅ If the channel is missing, set a default or show an error
    if (!currentChannel) {
        alert("❌ Error: Channel name is missing!");
        console.error("❌ Error: Channel name is missing!");
        return;
    }

    // ✅ Store channel in local storage
    localStorage.setItem("currentChannel", currentChannel);
    loadMessages();

    // ✅ Attach event listeners
    sendButton.addEventListener("click", sendMessage);
    messageBox.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });

    console.log("✅ Event listeners attached successfully.");



    document.addEventListener("DOMContentLoaded", function () {
        let channelElement = document.getElementById("channel");
        if (channelElement) {
            let currentChannel = channelElement.value.trim();
            console.log("Loaded channel from Thymeleaf:", currentChannel);
            localStorage.setItem("currentChannel", currentChannel);
            loadMessages();
        } else {
            console.error("Channel element not found!");
        }
    });


    // 📌 Function to send a message
    async function sendMessage() {
        let message = messageBox.value.trim();
        if (message === "") return;

        console.log(`📤 Attempting to send message: ${message}`);

        try {
            const response = await fetch(`/messages/send/${currentChannel}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "text": message })
            });

            if (!response.ok) {
                throw new Error(`❌ Failed to send message. Status: ${response.status}`);
            }

            console.log("✅ Message sent successfully");
            appendMessage(message);
            messageBox.value = "";
            messageDisplay.scrollTop = messageDisplay.scrollHeight;
        } catch (error) {
            console.error("❌ Error sending message:", error.message);
        }
    }

    // 📌 Function to load messages for the current channel
    async function loadMessages() {
        console.log(`🔄 Fetching messages for: ${currentChannel}`);

        try {
            const response = await fetch(`/messages/all/${currentChannel}`);
            if (!response.ok) {
                throw new Error(`❌ Failed to fetch messages. Status: ${response.status}`);
            }

            const messages = await response.json();
            console.log(`📥 Messages for ${currentChannel}:`, messages);

            messageDisplay.innerHTML = "";
            messages.forEach(msg => appendMessage(msg.text));

            messageDisplay.scrollTop = messageDisplay.scrollHeight;
        } catch (error) {
            console.error("❌ Error loading messages:", error.message);
        }
    }

    // 📌 Function to append messages to the chat display
    function appendMessage(text) {
        let messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.textContent = text;
        messageDisplay.appendChild(messageElement);
    }
});

// ✅ Ensure `switchChannel` is defined globally
function switchChannel(channel) {
    console.log(`Switching to channel: ${channel}`);
    localStorage.setItem("currentChannel", channel);
    window.location.href = `/${channel}`;
}

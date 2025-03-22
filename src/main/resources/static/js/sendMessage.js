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
    console.log(`✅ Resolved channel: ${currentChannel}`);

    // ✅ If the channel is missing, show an error
    if (!currentChannel) {
        console.error("❌ Error: Channel name is missing!");
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
});

// ✅ Function to switch channels
function switchChannel(channel) {
    console.log(`Switching to channel: ${channel}`);
    localStorage.setItem("currentChannel", channel);
    window.location.href = `/${channel}`;
}

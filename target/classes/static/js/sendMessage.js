async function showAlertPrompt() {
    return new Promise((resolve) => {
        const alertBox = document.createElement("div");
        alertBox.id = "alertBox";
        Object.assign(alertBox.style, {
            position: "fixed",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "auto",
            padding: "10px 20px",
            backgroundColor: "#f8d7da",
            color: "#721c24",
            border: "1px solid #f5c6cb",
            borderRadius: "5px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
            zIndex: "1000"
        });

        const message = document.createElement("p");
        message.textContent = "Enter your name:";
        message.style.margin = "0";

        const input = document.createElement("input");
        Object.assign(input, {
            type: "text",
            placeholder: "Your name"
        });
        Object.assign(input.style, {
            margin: "5px",
            padding: "5px",
            border: "1px solid #ccc",
            borderRadius: "3px"
        });

        const okButton = document.createElement("button");
        okButton.textContent = "OK";
        Object.assign(okButton.style, {
            marginLeft: "5px",
            padding: "5px 10px",
            border: "none",
            borderRadius: "3px",
            backgroundColor: "#28a745",
            color: "white",
            cursor: "pointer"
        });

        const cancelButton = document.createElement("button");
        cancelButton.textContent = "Cancel";
        Object.assign(cancelButton.style, {
            marginLeft: "5px",
            padding: "5px 10px",
            border: "none",
            borderRadius: "3px",
            backgroundColor: "#dc3545",
            color: "white",
            cursor: "pointer"
        });

        okButton.onclick = function () {
            const userName = input.value.trim();
            if (userName === "") {
                input.style.border = "1px solid red";
                return;
            }

            localStorage.setItem("currentUser", userName);
            alert(`Hello, ${userName}!!!`);
            document.body.removeChild(alertBox);
            resolve(userName);
        };

        cancelButton.onclick = function () {
            document.body.removeChild(alertBox);
            resolve(null);
        };

        input.oninput = function () {
            input.style.border = "1px solid #ccc";
        };

        alertBox.append(message, input, okButton, cancelButton);
        document.body.appendChild(alertBox);
    });
}

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

function sendMessage() {
    const messageBox = document.getElementById("messageBox");
    const currentUser = localStorage.getItem("currentUser");
    const currentChannel = localStorage.getItem("currentChannel");
    const toUser = document.getElementById("toUserInput")?.value.trim();

    const message = messageBox?.value.trim();
    if (!message) return;

    const payload = {
        text: message,
        fromUser: currentUser,
        toUser: toUser || ""
    };

    fetch(`/send/${currentChannel}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
        .then(response => {
            if (!response.ok) throw new Error("Failed to send message.");
            messageBox.value = "";
            loadMessages();
        })
        .catch(console.error);
}

function loadMessages() {
    const currentChannel = localStorage.getItem("currentChannel") || "channel1";

    fetch("/messages/all/" + currentChannel)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(messages => {
            // update UI with messages
        })
        .catch(error => {
            console.error("Error fetching messages:", error);
        });
}

// ✅ DOM Initialization
document.addEventListener("DOMContentLoaded", async function () {
    const channelElement = document.getElementById("channel");
    let currentChannel = channelElement?.value.trim() || "channel1";
    channelElement.value = currentChannel;
    localStorage.setItem("currentChannel", currentChannel);

    let currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        currentUser = await showAlertPrompt();
    }

    if (currentUser) {
        const display = document.getElementById("currentUserDisplay");
        if (display) {
            display.textContent = `You are logged in as: ${currentUser}`;
        }
        loadMessages(); // Load messages after login
    }

    const sendButton = document.getElementById("sendButton");
    const messageBox = document.getElementById("messageBox");

    if (sendButton) {
        sendButton.addEventListener("click", sendMessage);
    }

    if (messageBox) {
        messageBox.addEventListener("keydown", function (event) {
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                sendMessage();
            }
        });
    }

    // Polling every 500ms
    setInterval(loadMessages, 500);
});

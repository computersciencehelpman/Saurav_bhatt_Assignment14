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

            sessionStorage.setItem("currentUser", userName);
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


function switchChannel(channel) {
    console.log(`🔄 Switching to channel: ${channel}`);

   
    const channelElement = document.getElementById("channel");
    if (channelElement) {
        channelElement.value = channel;
    } else {
        console.warn("⚠️ Hidden channel input not found!");
    }

    localStorage.setItem("currentChannel", channel);
    window.location.href = `/${channel}`;
}

let lastMessageDate = null;

function appendMessage(message, sender) {
    const messageDate = new Date(message.timestamp);
    const formattedDate = messageDate.toLocaleDateString();

    if (lastMessageDate !== formattedDate) {
        const dateHeader = document.createElement('div');
        dateHeader.className = 'date-header';

        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        if (formattedDate === today.toLocaleDateString()) {
            dateHeader.textContent = 'Today';
        } else if (formattedDate === yesterday.toLocaleDateString()) {
            dateHeader.textContent = 'Yesterday';
        } else {
            dateHeader.textContent = messageDate.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }

        chat.appendChild(dateHeader);
        lastMessageDate = formattedDate;
    }

    const div = document.createElement('div');
    div.className = sender === username ? 'bubble sent' : 'bubble received';
    div.innerHTML = `
    <div class="message-content">${message.content}</div>
    <div class="timestamp">${messageDate.toLocaleString([], {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })}</div>
    <div class="avatar">${sender}</div>
`;
    
    chat.appendChild(div);
}


function sendMessage() {
    const messageBox = document.getElementById("messageBox");
    const currentUser = sessionStorage.getItem("currentUser");
    const currentChannel = localStorage.getItem("currentChannel");
    const toUser = document.getElementById("toUserInput")?.value.trim();

    const message = messageBox?.value.trim();
    if (!message) return;

    const payload = {
        text: message,
        fromUser: currentUser,
        toUser: toUser || ""
    };

    fetch(`/messages/send/${currentChannel}`, {
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

    fetch(`/messages/all/${currentChannel}`)
        .then(response => response.json())
        .then(messages => {
            const messageDisplay = document.getElementById("messageDisplay");
            if (!messageDisplay) return;

            messageDisplay.innerHTML = "";

            messages.forEach(msg => {
    		const msgWrapper = document.createElement("div");
   			msgWrapper.classList.add("message-column");
    		msgWrapper.classList.add(msg.fromUser === sessionStorage.getItem("currentUser") ? "sent" : "received");

    		const msgDiv = document.createElement("div");
msgDiv.classList.add("message-bubble");
msgDiv.classList.add(msg.fromUser === sessionStorage.getItem("currentUser") ? "sent" : "received");

const text = document.createElement("span");
text.textContent = msg.text;

const time = document.createElement("div");
time.classList.add("timestamp");
const date = new Date(msg.timestamp);
time.textContent = date.toLocaleString([], {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
}).replace(',', '');

const avatar = document.createElement("div");
avatar.classList.add("avatar");
avatar.textContent = msg.fromUser;

msgDiv.appendChild(text);
msgDiv.appendChild(time);
if (msg.fromUser === sessionStorage.getItem("currentUser")) {
    msgWrapper.appendChild(msgDiv);
    msgWrapper.appendChild(avatar); 
} else {
    msgWrapper.appendChild(avatar); 
    msgWrapper.appendChild(msgDiv);
}

messageDisplay.appendChild(msgWrapper);
    		
    		
		});
            
            
            

            messageDisplay.scrollTop = messageDisplay.scrollHeight;
        })
        .catch(console.error);
}

document.addEventListener("DOMContentLoaded", async function () {
    const channelElement = document.getElementById("channel");
    let currentChannel = channelElement?.value.trim() || "channel1";
    channelElement.value = currentChannel;
    localStorage.setItem("currentChannel", currentChannel);

    let currentUser = sessionStorage.getItem("currentUser");
    if (!currentUser) {
        currentUser = await showAlertPrompt();
    }

    if (currentUser) {
        const display = document.getElementById("currentUserDisplay");
        if (display) {
            display.textContent = `You are logged in as: ${currentUser}`;
        }
        loadMessages(); 
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

    setInterval(loadMessages, 500);
});


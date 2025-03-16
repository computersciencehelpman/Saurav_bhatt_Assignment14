function showAlertPrompt() {
    // Create the alert box
    const alertBox = document.createElement("div");
    alertBox.id = "alertBox";
    alertBox.style.position = "fixed";
    alertBox.style.top = "10px"; // Position at the top
    alertBox.style.left = "50%";
    alertBox.style.transform = "translateX(-50%)";
    alertBox.style.width = "auto";
    alertBox.style.padding = "10px 20px";
    alertBox.style.backgroundColor = "#f8d7da"; // Light red background like an alert
    alertBox.style.color = "#721c24"; // Dark red text
    alertBox.style.border = "1px solid #f5c6cb";
    alertBox.style.borderRadius = "5px";
    alertBox.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
    alertBox.style.textAlign = "center";
    alertBox.style.zIndex = "1000";

    const message = document.createElement("p");
    message.textContent = "Enter your name:";
    message.style.margin = "0";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Your name";
    input.style.margin = "5px";
    input.style.padding = "5px";
    input.style.border = "1px solid #ccc";
    input.style.borderRadius = "3px";

    const okButton = document.createElement("button");
    okButton.textContent = "OK";
    okButton.style.marginLeft = "5px";
    okButton.style.padding = "5px 10px";
    okButton.style.border = "none";
    okButton.style.borderRadius = "3px";
    okButton.style.backgroundColor = "#28a745";
    okButton.style.color = "white";
    okButton.style.cursor = "pointer";

    okButton.onclick = function () {
        if (input.value.trim() === "") {
            input.style.border = "1px solid red";
            return;
        }
        alert(`Hello, ${input.value}!!!`); // Shows the top-style alert like native alert
        document.body.removeChild(alertBox);
    };

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.style.marginLeft = "5px";
    cancelButton.style.padding = "5px 10px";
    cancelButton.style.border = "none";
    cancelButton.style.borderRadius = "3px";
    cancelButton.style.backgroundColor = "#dc3545";
    cancelButton.style.color = "white";
    cancelButton.style.cursor = "pointer";

    cancelButton.onclick = function () {
        document.body.removeChild(alertBox);
    };

    input.oninput = function () {
        input.style.border = "1px solid #ccc";
    };

    alertBox.appendChild(message);
    alertBox.appendChild(input);
    alertBox.appendChild(okButton);
    alertBox.appendChild(cancelButton);

    document.body.appendChild(alertBox);
}

// Show the alert prompt when the page loads
window.onload = showAlertPrompt;

            

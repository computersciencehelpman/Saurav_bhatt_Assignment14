function showAlertPrompt() {
    return new Promise((resolve) => {
        const alertBox = document.createElement("div");
        alertBox.id = "alertBox";
        alertBox.style.position = "fixed";
        alertBox.style.top = "10px";
        alertBox.style.left = "50%";
        alertBox.style.transform = "translateX(-50%)";
        alertBox.style.width = "auto";
        alertBox.style.padding = "10px 20px";
        alertBox.style.backgroundColor = "#f8d7da";
        alertBox.style.color = "#721c24";
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
            const userName = input.value.trim();
            if (userName === "") {
                input.style.border = "1px solid red";
                return;
            }

		sessionStorage.setItem("currentUser", userName);
		alert(`Hello, ${userName}!!!`);
		document.body.removeChild(alertBox);
		resolve(userName); // This resolves the prompt

		// THEN call fetch and redirect
		fetch("/setSessionUser", {
    	method: "POST",
    	headers: {
        	"Content-Type": "application/json"
    	},
    	body: JSON.stringify({ username: userName })
		}).then(() => {
    		window.location.href = "/general";
		});
		        

        input.oninput = function () {
            input.style.border = "1px solid #ccc";
        };

        alertBox.appendChild(message);
        alertBox.appendChild(input);
        alertBox.appendChild(okButton);

        document.body.appendChild(alertBox);
        input.focus(); 
    });
}


  document.getElementById("welcomeForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const userNameInput = document.getElementById("username");
    const userName = userNameInput.value.trim();
    const submitButton = document.getElementById("submitBtn");

    if (!userName) {
      alert("Please enter your name");
      return;
    }

    userNameInput.disabled = true;
    submitButton.disabled = true;

    submitButton.innerHTML = `<div class="spinner"></div>Entering...`;

    sessionStorage.setItem("currentUser", userName);

    try {
      await fetch("/setSessionUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: userName })
      });

      setTimeout(() => {
        window.location.href = "/channels";
      }, 400);

    } catch (error) {
      console.error("Error setting session user:", error);
      alert("Something went wrong. Please try again.");

      userNameInput.disabled = false;
      submitButton.disabled = false;
      submitButton.innerHTML = "Enter Chat";
    }
  });

async function switchChannel(channelName) {
    let user = sessionStorage.getItem("currentUser");

    if (!user) {
        const enteredName = await showAlertPrompt();
        if (!enteredName) {
            return;
        }
        sessionStorage.setItem("currentUser", enteredName); 
        user = enteredName;
    }

    window.location.href = `/${channelName}`;
}

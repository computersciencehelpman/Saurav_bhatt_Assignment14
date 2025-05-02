
    function openModal() {
        document.getElementById('modal').style.display = 'block';
    }

    function closeModal() {
        document.getElementById('modal').style.display = 'none';
    }

    function createChannel() {
        const name = document.getElementById('channelName').value.trim();
        if (name !== '') {
            const formData = new URLSearchParams();
            formData.append('name', name);

            fetch('/create-channel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData
            }).then(response => {
                if (response.redirected) {
                    window.location.href = response.url;
                } else {
                    alert('Failed to create channel.');
                }
            });
            closeModal();
        } else {
            alert('Please enter a channel name.');
        }
    }

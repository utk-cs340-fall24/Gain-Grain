document.getElementById('login').addEventListener('click', async function(event) {
    event.preventDefault();

    const username = document.querySelector('.username').value;
    const password = document.querySelector('.password').value;

    if(!username && !password) {
        showAlert('Username and password fields are required.');
        return;
    } else if(!username) {
        showAlert('Username field is required.');
        return;
    } else if(!password) {
        showAlert('Password field is required.');
        return;
    }

    try {
        const response = await fetch('/find-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                username: username, password: password 
            }),
        });

        const data = await response.json();
    
        if(response.ok && data.success) {
            window.location.href = '/'
        } else {
            showAlert(data.message);
        }
    } catch (error) {
        console.error("Error: ", error);
        showAlert('An error occured. Please try again.');
    }
});

function showAlert(message) {
    const alertContainer = document.getElementById('alert-container');
    const alertMessage = document.getElementById('alert-message');
    alertMessage.textContent = message;
    alertContainer.classList.remove('hidden');

    setTimeout(() => {
        alertContainer.classList.add('hidden');
    }, 20000);

    document.getElementById('alert-close').addEventListener('click', () => {
        alertContainer.classList.add('hidden');
    });
}
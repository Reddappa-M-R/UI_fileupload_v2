async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('http://localhost:8010/upload/', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Upload failed');
        }

        const data = await response.json();
        const responseMessage = document.getElementById('responseMessage');
        responseMessage.innerText = `${data.file}`;
        responseMessage.classList.add('success');

        // Display toaster notification
        displayToaster('File uploaded successfully');
    } catch (error) {
        document.getElementById('responseMessage').innerText = 'An error occurred while uploading the file. Please try again later.';
        console.error('Error uploading file:', error);
    }
}

function displayToaster(message) {
    const toaster = document.getElementById('toaster');
    toaster.innerText = message;
    toaster.classList.add('show');

    setTimeout(() => {
        toaster.classList.remove('show');
    }, 3000); // Hide after 3 seconds
}

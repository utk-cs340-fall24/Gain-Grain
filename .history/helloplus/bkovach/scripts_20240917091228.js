document.getElementById('fetchData').addEventListener('click', async () => {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        document.getElementById('output').textContent = data.message;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

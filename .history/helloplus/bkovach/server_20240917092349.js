const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(__dirname));

// Example API route
app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
  });
  
  // Serve the index.html file when accessing the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Preloaded workouts
let workouts = [
    'Push-ups',
    'Squats',
    'Lunges',
    'Burpees',
    'Planks',
];

app.get('/workouts')
  
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
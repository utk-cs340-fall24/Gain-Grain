const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static());

app.get('/api/data', (req, res) => {
    const data = { message: 'Hello from the backend!' };
    res.json(data);
});
  
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
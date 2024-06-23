const express = require('express');
const path = require('path');
const app = express();
const port = 5500;

// Serve static files from the root directory
app.use('/:id',express.static(path.join(__dirname, '/')));

// Rewrite /1/book-details.html to /book-details.html
app.get('/:id/book-details.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'book-details.html'));
});

app.get('/:id/book-details.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'book-details.html'));
});

// Test route
app.get('/test', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
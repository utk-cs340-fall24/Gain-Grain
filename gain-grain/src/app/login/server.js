const express = require('express');
const path = require("path");
const { body, validationResult } = require('express-validator');
const app = express();

const { createAndSaveUser, findUser } = require('../app.js/index.js');

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "html", "login.html"));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "html", "home.html"))
})

app.post('/create-user', [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, username, password } = req.body;

    createAndSaveUser(name, username, password, (err, data) => {
        if(err) {
            return res.status(500).json("Error creating user: ", err.message);
        }
        res.status(201).json({ success: true, message: "User created successfully", data });
    });
});

app.post("/find-user", async (req, res) => {
    const { username, password } = req.body;

    try {
        const userFound = await findUser(username, password);

        if(userFound.success) {
            return res.status(200).json(userFound);
        } else {
            return res.status(401).json(userFound);
        }
    } catch(err) {
        console.log("Server error: ", err);
        return res.status(500).json({ success: false, message: "Server error."});
    }
});
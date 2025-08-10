const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const dataFile = path.join(__dirname, "data.json");

function readData() {
    return JSON.parse(fs.readFileSync(dataFile));
}

function writeData(data) {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

// LOGIN
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const data = readData();
    const user = data.users.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({ success: true, page: user.page });
    } else {
        res.json({ success: false, message: "Invalid credentials" });
    }
});

// GET PROGRESS
app.get("/progress/:username", (req, res) => {
    const { username } = req.params;
    const data = readData();
    const user = data.users.find(u => u.username === username);
    if (user) {
        res.json({ success: true, progress: user.progress });
    } else {
        res.json({ success: false });
    }
});

// UPDATE PROGRESS
app.post("/progress", (req, res) => {
    const { username, progress } = req.body;
    const data = readData();
    const user = data.users.find(u => u.username === username);
    if (user) {
        user.progress = progress;
        writeData(data);
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));

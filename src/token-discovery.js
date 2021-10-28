const cors = require("cors");
const express = require("express");
const app = express();
const port = 3000;
const { exec } = require("child_process");
app.use(cors());
app.options("http://localhost:8080", cors());

app.get("/discover_tokens", (req, res, next) => {
    exec("python3 src/token-discovery.py", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        //console.log(`stdout: ${stdout}`);
        res.set("Content-Type", "application/json");
        res.send(stdout);
    });
});

app.listen(port, () => {
    console.log(`Token discovery listening at http://localhost:${port}`);
});

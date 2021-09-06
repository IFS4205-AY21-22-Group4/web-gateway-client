const http = require("http");

const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello World\n");
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

process.on("SIGINT", () => {
    console.log("Shutting down server..");
    process.exit(0);
});

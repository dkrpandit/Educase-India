const app = require("./src/app");

const startServer = async () => {
    const port = 3000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

startServer();
const app = require("./src/app");
// import { config } from "./src/config/config";
// import connectDB from "./src/config/db";

const startServer = async () => {
    // connecting to the databases
    // await connectDB();
    const port = 3000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

startServer();
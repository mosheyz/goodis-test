import "dotenv/config";
import express from "express";
import { router as soldiersRouter } from "./routers/soldiersRouter.js";
import { router as budgetsRouter } from "./routers/budgetsRouter.js";

const server = express();
const PORT = process.env.PORT;

server.use(express.json());

server.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
})

server.use("/soldiers/:soldierId/benefits", soldiersRouter);
server.use("/budget", budgetsRouter);

server.get("/", (req, res) => {
    res.send("hi");
});

server.use((err, req, res, next) => {
    console.error(err.message);
    res.status(err.status || 500).send(err.message || "Internal server error!");
});

server.listen(PORT, () => console.log("server listening"));

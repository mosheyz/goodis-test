import "dotenv/config"
import express from "express"

const server = express()
const PORT = process.env.PORT

server.get("/", (req, res) => {
    res.send("hi")
})

server.listen(PORT, () => console.log("server listening"))
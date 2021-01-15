const express = require('express');
const server = express();

const actionsRouter = require("./actions/actions-router")
const projectsRouter = require("./projects/projects-router")

server.use(express.json())

server.use("/api/actions", actionsRouter)
server.use("/api/projects", projectsRouter)

// server.use((error, req, res, next) => {
//   res.status(500).json({ 
//     error: "There was a problem communicating with the server.",
//     message: error.message,
//     stack: error.stack
//   })
// })

module.exports = server;

const express = require("express")
const Projects = require("./projects-model")

const router = express.Router()

const { valProjectId, valProject } = require("../middleware")

router.get("/", (req, res, next) => {
  Projects.get()
    .then(projects => {
      if (!projects) {
        res.status(404).json({ errorMessage: "Could not retrieve projects" })
      } else {
        res.status(200).json(projects)
      }
    })
    .catch(next)
})

router.get("/:id", valProjectId, (req, res, next) => {
  const { project } = req
  res.status(200).json(project)
})

router.post("/", valProject, (req, res, next) => {
  const { body } = req
  Projects.insert(body)
    .then(newProject => {
      res.status(200).json(newProject)
    })
    .catch(next)
})

router.put("/:id", valProjectId, valProject, (req, res, next) => {
  const { id } = req.params
  const { body } = req
  Projects.update(id, body)
    .then(updatedProject => {
      res.status(200).json(updatedProject)
    })
    .catch(next)
})

router.delete("/:id", valProjectId, (req, res, next) => {
  const { id } = req.params
  Projects.remove(id)
    .then(() => {
      res.status(200).json({ message: `The project with id ${id} has been deleted.` })
    })
})

router.use((error, req, res, next) => {
  res.status(500).json({ 
    error: "There was a problem communicating with the server.",
    message: error.message,
    stack: error.stack
  })
})

module.exports = router

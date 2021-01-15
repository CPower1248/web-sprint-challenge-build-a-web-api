const Actions = require("../actions/actions-model")
const Projects = require("../projects/projects-model")

async function valProjectId(req, res, next) {
  const { id } = req.params
  try {
    const project = await Projects.get(id)
    if (!project) {
      res.status(404).json({ errorMessage: `The project with id ${id} could not be found` })
    } else {
      req.project = project
      next()
    }
  } catch(err) {
    next(err)
  }
}

function valProject(req, res, next) {
  const { body } = req
  if (!body.name || !body.description) {
    res.status(400).json({ errorMessage: "Missing required name and description" })
  } else {
    req.body = body
    next()
  }
}

async function valActionId(req, res, next) {
  const { id } = req.params
  try{
    const action = await Actions.get(id)
    if (!action) {
      res.status(404).json({ errorMessage: `The action with id ${id} could not be found` })
    } else {
      req.action = action
      next()
    }
  } catch (err) {
    next(err)
  }
}

function valAction(req, res, next) {
  const { body } = req
  if (!body.project_id || !body.description || !body.notes) {
    res.status(400).json({ errorMessage: "Missing required project_id, description and notes" })
  } else {
    req.body = body
    next()
  }
}

module.exports = { valProjectId, valProject, valActionId, valAction }

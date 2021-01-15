// const Actions = require("../actions/actions-model")

const valAction = (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ errorMessage: "Missing action body" })
  } else {
    next()
  }
}

const await valActionId = (req, res, next) => {
  try{
    const action = await getById(req.params.id)
    if (!action) {
      res.status(404).json({ errorMessage: `The action with id ${id} could not be found` })
    } else {
      next()
    }
  } catch (err) {
    res.status(500).json({ message: error.message, stack: error.stack })
  }
}

module.exports = { valAction, valActionId }

const express = require("express")
const Actions = require("./actions-model")

const router = express.Router()

const { valProjectId, valActionId, valAction } = require("../middleware")

router.get('/', (req, res, next) => {
  Actions.get()
    .then(actions => {
      if (!actions) {
        res.status(404).json({ errorMessage: "Could not retrieve actions." })
      } else {
        res.status(200).json(actions)
      }
    })
    .catch(next)
});

router.get('/:id', valActionId, (req, res, next) => {
  Actions.get(req.params.id)
    .then(action => {
      res.status(200).json(action)
    })
    .catch(next)
});

router.post('/:id', valProjectId, valAction, (req, res, next) => {
  const { body } = req
  Actions.insert(body)
    .then(newAction => {
      res.status(200).json(newAction)
    })
    .catch(next)
});

router.put('/:id', valActionId, valAction, (req, res, next) => {
  const { id } = req.params
  const { body } = req
  Actions.update(id, body)
    .then(updatedAction => {
      res.status(200).json(updatedAction)
    })
    .catch(next)
});

router.delete('/:id', valActionId, (req, res, next) => {
  const { id } = req.params
  Actions.remove(id)
    .then(() => {
      res.status(200).json({ message: `The action with id ${id} has been deleted.` })
    })
    .catch(next)
});

router.use((error, req, res, next) => {
  res.status(500).json({ 
    error: "There was a problem communicating with the server.",
    message: error.message,
    stack: error.stack
  })
})

module.exports = router

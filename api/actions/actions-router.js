const express = require("express")
const Actions = require("./actions-model")

const router = express.Router()

const { valAction, valActionId } = require("../middleware")

// router.get('/', (req, res, next) => {

// });

router.get('/:id', valActionId, (req, res) => {
  Actions.get(req.params.id)
    .then(actions => {
      res.status(actions)
    })
    .catch(err => {
      res.status(500).json({ 
        error: "The was a problem communicating with the server",
        message: err.message,
        stack: err.stack
      })
    })
});

router.post('/', valAction, (req, res) => {
  Actions.insert(req.body)
    .then(newAction => {
      res.status(201).json(newAction)
    })
    .catch(err => {
      res.status(500).json({ 
        error: "The was a problem communicating with the server",
        message: err.message,
        stack: err.stack
      })
    })
});

// router.put('/', (req, res, next) => {

// });

// router.delete('/', (req, res, next) => {

// });

module.exports = router

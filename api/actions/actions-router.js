const express = require("express")
const Actions = require("./actions-model")

const router = express.Router()

const { valActionId, valAction } = require("../middleware")

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

// router.post('/', valAction, (req, res) => {
//   Actions.insert(req.body)
//     .then(newAction => {
//       res.status(201).json(newAction)
//     })
//     .catch(err => {
//       res.status(500).json({ 
//         error: "The was a problem communicating with the server",
//         message: err.message,
//         stack: err.stack
//       })
//     })
// });

// router.put('/', (req, res, next) => {

// });

// router.delete('/', (req, res, next) => {

// });

router.use((error, req, res, next) => {
  res.status(500).json({ 
    error: "There was a problem communicating with the server.",
    message: error.message,
    stack: error.stack
  })
})

module.exports = router

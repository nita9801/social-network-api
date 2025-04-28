// Imports
const router = require('express').Router();

// imports functions that are written in the thoughcontroller file
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../controllers/thoughtController');

// Routes for thoughts
router.route('/').get(getThoughts).post(createThought);

// route for thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// Routes for reactions
router
  .route('/:thoughtId/reactions')
  .post(addReaction);

router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);
// exports
module.exports = router;
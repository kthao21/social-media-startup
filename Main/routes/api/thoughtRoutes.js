const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  addThought,
  removeThought,
} = require('../../controllers/thoughtController');

// /api/users
router.route('/').get(getThoughts).post(createThought);

// /api/users/:userId/
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought);

// /api/users/:userId/thought
router.route('/:userId/thoughts').post(addThought);

// /api/users/:userId/thought/:thoughtId
router.route('/:userId/thoughts/:thoughtId').delete(removeThought);

module.exports = router;

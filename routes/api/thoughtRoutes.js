const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought

} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).post(getSingleThought);

// /api/thoughts/:thoughtId/create
router.route('/:thoughtId').get(createThought).post(createThought);

// //// /api/thoughts/:thoughtId/delete
router.route('/:thoughtId').get(deleteThought).delete(deleteThought);

// // /api/thoughts/:thoughtId/update
router.route('/:thoughtId').get(updateThought).put(updateThought);



module.exports = router;

const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/userController.js');

// /api/getUsers
router.route('/').get(getUsers).post(createUser);

// /api/getUsers/:userId
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);


// /api/users/:userId/friends/:friendId
router.route('/:userId').get(getUsers).post(addFriend);

router.route('/:userId').get(deleteFriend).delete(deleteFriend);

module.exports = router;

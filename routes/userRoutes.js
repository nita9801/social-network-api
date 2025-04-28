const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../controllers/userController');

// Route for users
router.get('/', getUsers);
router.get('/:id', getSingleUser);

// Route for userID
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// Route for friend ID
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

// Export
module.exports = router;
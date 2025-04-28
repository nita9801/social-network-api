// Imports
const User = require('../models/User');
const Thought = require('../models/Thought');
// get all users

const getUsers = (req, res) => {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  }
  // get single user
   const getSingleUser = (req, res) => {
    User.findOne({ _id: req.params.userId })
      .populate('thoughts')
      .populate('friends')
      .then((user) =>
        !user ? res.status(404).json({ message: 'No user found' }) : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  }
  // create user
   const createUser = (req, res) => {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  }
  // update user
   const updateUser = (req, res) => { 
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true })
      .then((user) =>
        !user ? res.status(404).json({ message: 'No user found' }) : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  }
  // delete user 
 const deleteUser = (req, res) => {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User and thoughts deleted' }))
      .catch((err) => res.status(500).json(err));
  }
  // add a friend
  const addFriend = (req, res) => {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user ? res.status(404).json({ message: 'No user found' }) : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  }
  // unfriend
  const removeFriend = (req, res) => {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user ? res.status(404).json({ message: 'No user found' }) : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  }

// Export all functions
module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
};
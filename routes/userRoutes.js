const router = require('express').Router();
const User = require('../models/User');

// Get all users
router.get('/', async (req, res) => {
  const users = await User.find().populate('thoughts').populate('friends');
  res.json(users);
});

// Create a user
router.post('/', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

// Update a user
router.put('/:userId', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
  res.json(user);
});

// Delete a user
router.delete('/:userId', async (req, res) => {
  await User.findByIdAndDelete(req.params.userId);
  res.status(204).send();
});

// Add a friend
router.post('/:userId/friends/:friendId', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
  res.json(user);
});

// Remove a friend
router.delete('/:userId/friends/:friendId', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
  res.json(user);
});

module.exports = router;

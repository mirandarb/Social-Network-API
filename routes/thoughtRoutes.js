const router = require('express').Router();
const Thought = require('../models/Thought');

// Get all thoughts
router.get('/', async (req, res) => {
  const thoughts = await Thought.find();
  res.json(thoughts);
});

// Create a thought
router.post('/', async (req, res) => {
  const thought = new Thought(req.body);
  await thought.save();
  res.status(201).json(thought);
});

// Update a thought
router.put('/:thoughtId', async (req, res) => {
  const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
  res.json(thought);
});

// Delete a thought
router.delete('/:thoughtId', async (req, res) => {
  await Thought.findByIdAndDelete(req.params.thoughtId);
  res.status(204).send();
});

// Add a reaction
router.post('/:thoughtId/reactions', async (req, res) => {
  const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true });
  res.json(thought);
});

// Remove a reaction
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
  res.json(thought);
});

module.exports = router;

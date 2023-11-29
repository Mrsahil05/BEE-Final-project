const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Create a new post
router.post('/', async (req, res) => {
  try {
    const newPost = await postController.createPost(req.body);
    res.json(newPost);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
});

// Retrieve all posts
router.get('/', async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;

  try {
    const posts = await postController.getAllPosts(page, pageSize);
    res.json(posts);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
});

// Retrieve a post by ID
router.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await postController.getPostById(postId);
    res.json(post);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
});

// Update a post by ID
router.put('/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
    const updatedPost = await postController.updatePost(postId, req.body);
    res.json(updatedPost);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
});

// Delete a post by ID
router.delete('/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
    const result = await postController.deletePost(postId);
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
});

module.exports = router;

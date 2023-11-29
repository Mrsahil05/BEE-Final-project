const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams allows access to parent route parameters
const commentController = require('../controllers/commentController');

// Create a new comment for a post
router.post('/', async (req, res) => {
  const { postId } = req.params;
  try {
    const newComment = await commentController.createComment(postId, req.body);
    res.json(newComment);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
});

// Retrieve all comments for a post
router.get('/', async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const { postId } = req.params;

  try {
    if (req.query.page && req.query.pageSize) {
      // Pagination route
      const comments = await commentController.getCommentsForPostWithPagination(postId, page, pageSize);
      res.json(comments);
    } else {
      // Regular route to get all comments
      const comments = await commentController.getAllCommentsForPost(postId);
      res.json(comments);
    }
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
});

// Retrieve a comment by ID within a post
router.get('/:commentId', async (req, res) => {
  const { postId, commentId } = req.params;
  try {
    const comment = await commentController.getCommentByIdInPost(postId, commentId);
    res.json(comment);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
});

// Update a comment by ID within a post
router.put('/:commentId', async (req, res) => {
  const { postId, commentId } = req.params;
  try {
    const updatedComment = await commentController.updateCommentInPost(postId, commentId, req.body);
    res.json(updatedComment);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
});

// Delete a comment by ID within a post
router.delete('/:commentId', async (req, res) => {
  const { postId, commentId } = req.params;
  try {
    const result = await commentController.deleteCommentInPost(postId, commentId);
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
});

module.exports = router;

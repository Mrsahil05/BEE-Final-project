const Comment = require('../models/commentModel');
const Post = require('/models/postModel'); 


const commentController = {
  // Create a new comment for a post
  createComment: async (postId, commentData) => {
    try {
      const newComment = new Comment(commentData);
      const post = await Post.findById(postId);
      if (!post) {
        throw { status: 404, message: 'Post not found' };
      }
      post.comments.push(newComment);
      await post.save();
      return newComment;
    } catch (error) {
      throw error;
    }
  },

  // Retrieve all comments for a post
  getAllCommentsForPost: async (postId) => {
    try {
      const post = await Post.findById(postId);
      if (!post) {
        throw { status: 404, message: 'Post not found' };
      }
      return post.comments;
    } catch (error) {
      throw error;
    }
  },

  // Retrieve a comment by ID within a post
  getCommentByIdInPost: async (postId, commentId) => {
    try {
      const post = await Post.findById(postId);
      if (!post) {
        throw { status: 404, message: 'Post not found' };
      }

      const comment = post.comments.id(commentId);
      if (!comment) {
        throw { status: 404, message: 'Comment not found' };
      }

      return comment;
    } catch (error) {
      throw error;
    }
  },

  // Update a comment by ID within a post
  updateCommentInPost: async (postId, commentId, updatedData) => {
    try {
      const post = await Post.findById(postId);
      if (!post) {
        throw { status: 404, message: 'Post not found' };
      }

      const comment = post.comments.id(commentId);
      if (!comment) {
        throw { status: 404, message: 'Comment not found' };
      }

      comment.set(updatedData);
      await post.save();
      return comment;
    } catch (error) {
      throw error;
    }
  },

  // Delete a comment by ID within a post
  deleteCommentInPost: async (postId, commentId) => {
    try {
      const post = await Post.findById(postId);
      if (!post) {
        throw { status: 404, message: 'Post not found' };
      }

      const comment = post.comments.id(commentId);
      if (!comment) {
        throw { status: 404, message: 'Comment not found' };
      }

      comment.remove();
      await post.save();
      return { success: true };
    } catch (error) {
      throw error;
    }
  },
};

module.exports = commentController;

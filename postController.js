const Post = require('/models/postModel');

const postController = {
  createPost: async (postData) => {
    try {
      const newPost = new Post(postData);
      const savedPost = await newPost.save();
      return savedPost;
    } catch (error) {
      throw { status: 500, message: 'Error creating post', error: error.message };
    }
  },

  getAllPosts: async () => {
    try {
      const posts = await Post.find();
      return posts;
    } catch (error) {
      throw { status: 500, message: 'Error fetching posts', error: error.message };
    }
  },

  getPostById: async (postId) => {
    try {
      const post = await Post.findById(postId);
      if (!post) {
        throw { status: 404, message: 'Post not found' };
      }
      return post;
    } catch (error) {
      throw { status: 500, message: 'Error fetching post by ID', error: error.message };
    }
  },

  updatePost: async (postId, updatedData) => {
    try {
      const updatedPost = await Post.findByIdAndUpdate(postId, updatedData, { new: true });
      if (!updatedPost) {
        throw { status: 404, message: 'Post not found' };
      }
      return updatedPost;
    } catch (error) {
      throw { status: 500, message: 'Error updating post', error: error.message };
    }
  },

  deletePost: async (postId) => {
    try {
      const deletedPost = await Post.findByIdAndDelete(postId);
      if (!deletedPost) {
        throw { status: 404, message: 'Post not found' };
      }
      return { success: true };
    } catch (error) {
      throw { status: 500, message: 'Error deleting post', error: error.message };
    }
  },
};

module.exports = postController;

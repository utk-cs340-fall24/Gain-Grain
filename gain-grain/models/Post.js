import mongoose from 'mongoose'; // Use ES Module import

// Define the Post schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  comments: [{
    user: String,
    comment: String,
    date: { type: Date, default: Date.now }
  }]
});

// Create a model for the Post schema
const Post = mongoose.model('Post', postSchema);

export default Post;
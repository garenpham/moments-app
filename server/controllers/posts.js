import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; // Get the starting index of every page
    const total = await PostMessage.countDocuments({});

    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    // console.log(posts);
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * QUERY -> /posts?page=1 -> page = 1
 * PARAMS -> /posts/:id -> /posts/123 -> id = 123
 */

const getSearchedPosts = async (req, res) => {
  const { keywords, tags } = req.query;
  try {
    const title = new RegExp(keywords, 'i'); // 'i' -> case insensitive (TEST test Test === test)
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(',') } }],
    });

    res.json({ data: posts });
  } catch (error) {
    // console.log(req.query);
    res.status(404).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('Post does not exist!');

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    },
  );
  res.json(updatedPost);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('Post does not exist!');

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: 'Post deleted successfully!' });
};

const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    res.json({ message: 'Unauthenticated' });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('Post does not exist!');

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex(id => id === String(req.userId));

  if (index === -1) {
    // Like post
    post.likes.push(req.userId);
  } else {
    // Dislike
    post.likes = post.likes.filter(id => id !== String(req.userId)); // Returns all the likes except the like from req.userId
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export {
  createPost,
  deletePost,
  getPost,
  getPosts,
  getSearchedPosts,
  likePost,
  updatePost,
};

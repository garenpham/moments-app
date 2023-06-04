import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

const getPosts = async (req, res) => {
	try {
		const postMessages = await PostMessage.find();
		console.log(postMessages);
		res.status(200).json(postMessages);
	} catch (error) {
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

	const index = post.likes.findIndex((id) => id === String(req.userId));

	if (index === -1) {
		// Like post
		post.likes.push(req.userId);
	} else {
		// Dislike
		post.likes = post.likes.filter((id) => id !== String(req.userId)); // Returns all the likes except the like from req.userId
	}

	const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
		new: true,
	});

	res.json(updatedPost);
};

export { createPost, deletePost, getPosts, likePost, updatePost };

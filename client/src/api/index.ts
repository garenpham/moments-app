import axios from 'axios';
import { PostProps } from '../types';

const url = process.env.REACT_APP_SERVER_URL || '';

const fetchPosts = () => axios.get(url);
const createPost = (newPost: PostProps) => axios.post(url, newPost);
const updatePost = (id: number, updatedPost: PostProps) =>
	axios.patch(`${url}/${id}`, updatedPost);
const deletePost = (id: number) => axios.delete(`${url}/${id}`);
const likePost = (id: number) => axios.patch(`${url}/${id}/likePost`);

const fetchGoogleCredentials = (token: string) =>
	axios
		.get(
			`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: 'application/json',
				},
			},
		)
		.then((res) => {
			return res.data;
		})
		.catch((err) => console.log(err));

export {
	createPost,
	deletePost,
	fetchGoogleCredentials,
	fetchPosts,
	likePost,
	updatePost,
};

import axios from 'axios';
import { PostProps, formData, searchQueryProps } from '../types';

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

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });

API.interceptors.request.use((req) => {
	if (localStorage.getItem('profile')) {
		const token = JSON.parse(localStorage.getItem('profile')!).token;

		if (token) {
			req.headers.Authorization = `Bearer ${token}`;
		} else {
			req.headers.Authorization = JSON.parse(
				localStorage.getItem('profile')!,
			).result.id;
		}
	}

	// console.log(req);

	return req;
});

const fetchPosts = () => API.get('/posts'); // === axios.get(`${baseURL}/posts`)
const fetchSearchedPosts = (searchQuery: searchQueryProps) =>
	API.get(
		`/posts/search?keywords=${searchQuery.search || 'none'}&tags=${
			searchQuery.tags
		}`,
	);
const createPost = (newPost: PostProps) => API.post('/posts', newPost);
const updatePost = (id: number, updatedPost: PostProps) =>
	API.patch(`/posts/${id}`, updatedPost);
const deletePost = (id: number) => API.delete(`/posts/${id}`);
const likePost = (id: number) => API.patch(`/posts/${id}/likePost`);

const signIn = (formData: formData) => API.post('/user/signin', formData);
const signUp = (formData: formData) => API.post('/user/signup', formData);

export {
	createPost,
	deletePost,
	fetchGoogleCredentials,
	fetchPosts,
	fetchSearchedPosts,
	likePost,
	signIn,
	signUp,
	updatePost,
};

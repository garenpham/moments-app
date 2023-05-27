import axios from 'axios';
import { PostCreateProps } from '../types';

const url = process.env.REACT_APP_SERVER_URL || '';

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost: PostCreateProps) =>
	axios.post(url, newPost);

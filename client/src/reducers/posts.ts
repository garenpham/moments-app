import { AnyAction } from '@reduxjs/toolkit';
import {
	CREATE,
	DELETE,
	FETCH_ALL,
	LIKE,
	UPDATE,
} from '../constants/actionTypes';
import { PostProps } from '../types';

const posts = (posts = [], action: AnyAction) => {
	switch (action.type) {
		case FETCH_ALL:
			return action.payload;
		case CREATE:
			return [...posts, action.payload];
		case UPDATE: //UPDATE will do the same as LIKE
		case LIKE:
			return posts.map((post: PostProps) =>
				post?._id === action.payload._id ? action.payload : post,
			);
		case DELETE:
			return posts.filter((post: PostProps) => post?._id !== action.payload);
		default:
			return posts;
	}
};

export default posts;

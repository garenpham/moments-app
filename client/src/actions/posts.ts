import { Dispatch } from 'react';
import * as api from '../api';
import { ICreate, IFetchAll, PostCreateProps } from '../types';

//Actions Creators
export const getPosts = () => async (dispatch: Dispatch<IFetchAll>) => {
	try {
		const { data } = await api.fetchPosts();
		dispatch({ type: 'FETCH_ALL', payload: data });
	} catch (error: any) {
		console.log(error.message);
	}
};

export const createPost =
	(post: PostCreateProps) => async (dispatch: Dispatch<ICreate>) => {
		try {
			const { data } = await api.createPost(post);
			dispatch({ type: 'CREATE', payload: data });
			console.log(post);
		} catch (error: any) {
			console.log(error.message);
		}
	};

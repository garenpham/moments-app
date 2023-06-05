import { Dispatch } from 'react';
import * as api from '../api';
import {
	CREATE,
	DELETE,
	FETCH_ALL,
	LIKE,
	UPDATE,
} from '../constants/actionTypes';
import { IAction, IDelete, PostProps } from '../types';

//Actions Creators
const getPosts = () => async (dispatch: Dispatch<IAction>) => {
	try {
		const { data } = await api.fetchPosts();
		dispatch({ type: FETCH_ALL, payload: data });
	} catch (error: any) {
		console.log(error.message);
	}
};

const createPost = (post: PostProps) => async (dispatch: Dispatch<IAction>) => {
	try {
		const { data } = await api.createPost(post);
		dispatch({ type: CREATE, payload: data });
		// console.log(post);
	} catch (error: any) {
		console.log(error.message);
	}
};

const updatePost =
	(id: number, post: PostProps) => async (dispatch: Dispatch<IAction>) => {
		try {
			const { data } = await api.updatePost(id, post);
			dispatch({ type: UPDATE, payload: data });
		} catch (error: any) {
			console.log(error.message);
		}
	};

const deletePost = (id: number) => async (dispatch: Dispatch<IDelete>) => {
	try {
		await api.deletePost(id);
		dispatch({ type: DELETE, payload: id });
	} catch (error: any) {
		console.log(error.message);
	}
};

const likePost = (id: number) => async (dispatch: Dispatch<IAction>) => {
	try {
		const { data } = await api.likePost(id);
		dispatch({ type: LIKE, payload: data });
	} catch (error: any) {
		console.log(error.message);
	}
};

export { createPost, deletePost, getPosts, likePost, updatePost };

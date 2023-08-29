import { Dispatch } from 'react';
import { NavigateFunction } from 'react-router-dom'
import * as api from '../api'
import {
  COMMENT,
  CREATE,
  DELETE,
  END_LOADING,
  FETCH_ALL,
  FETCH_POST,
  FETCH_SEARCHES,
  LIKE,
  START_LOADING,
  UPDATE,
} from '../constants/actionTypes'
import {
  IAction,
  IDelete,
  ISearchAction,
  PostProps,
  searchQueryProps,
} from '../types'

//Actions Creators

const getPost =
  (id: string | undefined) => async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: START_LOADING })
      const { data } = await api.fetchPost(id)
      // console.log(data);
      dispatch({ type: FETCH_POST, payload: data })
      dispatch({ type: END_LOADING })
    } catch (error: any) {
      console.log(error.message)
    }
  }

const getPosts = (page: number) => async (dispatch: Dispatch<IAction>) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.fetchPosts(page)
    // console.log(data);
    dispatch({ type: FETCH_ALL, payload: data })
    dispatch({ type: END_LOADING })
  } catch (error: any) {
    console.log(error.message)
  }
}

const getSearchedPosts =
  (searchQuery: searchQueryProps) =>
  async (dispatch: Dispatch<ISearchAction>) => {
    try {
      dispatch({ type: START_LOADING })
      const {
        data: { data },
      } = await api.fetchSearchedPosts(searchQuery)
      dispatch({ type: FETCH_SEARCHES, payload: data })
      dispatch({ type: END_LOADING })
    } catch (error: any) {
      console.log(error.message)
    }
  }

const createPost =
  (post: PostProps, navigate: NavigateFunction) =>
  async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: START_LOADING })
      const { data } = await api.createPost(post)
      dispatch({ type: CREATE, payload: data })
      navigate(`/posts/${data._id}`)
      // console.log(post);
    } catch (error: any) {
      console.log(error.message)
    }
  }

const updatePost =
  (id: number, post: PostProps) => async (dispatch: Dispatch<IAction>) => {
    try {
      const { data } = await api.updatePost(id, post)
      dispatch({ type: UPDATE, payload: data })
    } catch (error: any) {
      console.log(error.message)
    }
  }

const deletePost = (id: number) => async (dispatch: Dispatch<IDelete>) => {
  try {
    await api.deletePost(id)
    dispatch({ type: DELETE, payload: id })
  } catch (error: any) {
    console.log(error.message)
  }
}

const likePost = (id: number) => async (dispatch: Dispatch<IAction>) => {
  try {
    const { data } = await api.likePost(id)
    dispatch({ type: LIKE, payload: data })
  } catch (error: any) {
    console.log(error.message)
  }
}

const commentPost =
  (value: string, id: number) => async (dispatch: Dispatch<IAction>) => {
    try {
      const { data } = await api.commentPost(value, id)
      // console.log(data)
      dispatch({ type: COMMENT, payload: data })
      return data.comments
    } catch (error: any) {
      console.log(error.message)
    }
  }

export {
  commentPost,
  createPost,
  deletePost,
  getPost,
  getPosts,
  getSearchedPosts,
  likePost,
  updatePost,
}


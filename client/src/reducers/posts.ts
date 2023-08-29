import { AnyAction } from '@reduxjs/toolkit';
import {
  CREATE,
  DELETE,
  END_LOADING,
  FETCH_ALL,
  FETCH_POST,
  FETCH_SEARCHES,
  LIKE,
  START_LOADING,
  UPDATE,
  COMMENT,
} from '../constants/actionTypes'
import { PostProps, statePosts } from '../types'

const posts = (
  state: statePosts = { isLoading: true, posts: [] },
  action: AnyAction
) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true }
    case END_LOADING:
      return { ...state, isLoading: false }
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      }
    case FETCH_POST:
      return { ...state, post: action.payload as PostProps }
    case FETCH_SEARCHES:
      return { ...state, posts: action.payload }
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] }
    case UPDATE: //UPDATE will do same task as LIKE
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post: PostProps) =>
          post?._id === action.payload._id ? action.payload : post
        ),
      }
    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          //update the post that just received the comment
          if (post._id === action.payload._id) {
            return action.payload
          }
          //return all the other posts normally
          return post
        }),
      }
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter(
          (post: PostProps) => post?._id !== action.payload
        ),
      }
    default:
      return state
  }
}

export default posts;

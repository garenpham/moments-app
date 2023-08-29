import express from 'express';
import {
  commentPost,
  createPost,
  deletePost,
  getPost,
  getPosts,
  getSearchedPosts,
  likePost,
  updatePost,
} from '../controllers/posts.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', getPosts)
router.get('/search', getSearchedPosts)
router.get('/:id', getPost) // routes with id need to come after other routes

router.post('/', auth, createPost)
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/likePost', auth, likePost)
router.post('/:id/commentPost', auth, commentPost)

export default router;

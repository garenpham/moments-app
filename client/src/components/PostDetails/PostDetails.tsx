import {
  Box,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import moment from 'moment';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPost, getSearchedPosts } from '../../actions/posts';
import { globalStyles } from '../../constants/globalStyles'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { PostProps } from '../../types'
import CommentSection from './CommentSection'
import styles from './styles'

type Props = {}

const PostDetails = (props: Props) => {
  const { post, posts, isLoading } = useAppSelector((state) => state.posts)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    dispatch(getPost(id))
  }, [dispatch, id])

  useEffect(() => {
    if (post) {
      dispatch(getSearchedPosts({ search: 'none', tags: post?.tags.join(',') }))
    }
  }, [dispatch, post])

  if (!post) return null

  if (isLoading) {
    ;<Paper elevation={6} sx={styles.loadingPaper}>
      <CircularProgress size='7em' />
    </Paper>
  }

  const recommendedPosts = posts.filter(
    ({ _id }: PostProps) => _id !== post._id
  )

  const openPost = (_id: number | undefined) => navigate(`/posts/${_id}`)

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <Box component='div' sx={styles.card}>
        {post && (
          <>
            <Box component='div' sx={styles.section}>
              <Typography variant='h3' component='h2'>
                {post.title}
              </Typography>
              <Typography
                gutterBottom
                variant='h6'
                color='primary'
                component='h2'>
                {post.tags.map((tag) => `#${tag} `)}
              </Typography>
              <Typography gutterBottom variant='body1' component='p'>
                {post.message}
              </Typography>
              <Typography variant='h6'>
                <span className='font-semibold'>Created by:</span> {post.name}
              </Typography>
              <Typography variant='body1' color='textSecondary'>
                {moment(post.createdAt).fromNow()}
              </Typography>
              <Divider style={{ margin: '20px 0' }} />
              <CommentSection post={post} />
              <Divider style={{ margin: '20px 0' }} />
            </Box>
            <Box component='div' sx={styles.imageSection}>
              <Box
                component='img'
                sx={styles.media}
                src={
                  post.selectedFile ||
                  'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
                }
                alt={post.title}
              />
            </Box>
          </>
        )}
      </Box>

      {recommendedPosts.length && (
        <Box component='div' sx={styles.section}>
          <Typography gutterBottom variant='h5'>
            You might also like:
          </Typography>
          <Divider />

          <Box component='div' sx={styles.recommendedPosts}>
            {recommendedPosts.map(
              ({
                title,
                message,
                name,
                likes,
                selectedFile,
                _id,
              }: PostProps) => (
                <Box
                  className={`mt-[2rem] m-[.4rem] border rounded-xl hover:shadow lg:hover:scale-[1.02] lg:active:scale-100 active:scale-95 ${globalStyles.longTransition}`}
                  component='div'
                  sx={styles.sectionDetails}
                  onClick={() => openPost(_id)}
                  key={_id}>
                  <Typography gutterBottom variant='h6'>
                    {title}
                  </Typography>
                  <Typography
                    className='font-semibold'
                    gutterBottom
                    variant='subtitle2'>
                    {name}
                  </Typography>
                  <Typography gutterBottom variant='subtitle2'>
                    {message}
                  </Typography>
                  <Typography
                    className='text-blue-600'
                    gutterBottom
                    variant='subtitle1'>
                    {likes && `Likes: ${likes.length}`}
                  </Typography>
                  <img
                    src={selectedFile}
                    alt='Recommended Post'
                    width='200px'
                    height='133px'
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
              )
            )}
          </Box>
        </Box>
      )}
    </Paper>
  )
}

export default PostDetails;

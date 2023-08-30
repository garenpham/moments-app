import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { commentPost } from '../../actions/posts'
import { useAppDispatch } from '../../hooks'
import { PostProps } from '../../types'
import styles from './styles'

type Props = {
  post: PostProps
}

const CommentSection = ({ post }: Props) => {
  // console.log(post)
  const [comments, setComments] = React.useState(post?.comments)

  React.useEffect(() => {
    setComments(post.comments)
  }, [post])

  const [comment, setComment] = React.useState('')
  const user = JSON.parse(localStorage.getItem('profile')!)

  const dispatch = useAppDispatch()
  const commentsRef = React.useRef<HTMLDivElement>(null)
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const finalComment = `${user.result.name}: ${comment}`
    const newComments = await dispatch(commentPost(finalComment, post._id!))
    setComments(newComments)
    setComment('')

    commentsRef?.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <div>
      <Box component='div' sx={styles.commentsOuterContainer}>
        <Box component='div' sx={styles.commentsInnerContainer}>
          <Typography gutterBottom variant='h6'>
            Comments
          </Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant='subtitle1'>
              <strong>{c.split(': ')[0]}:</strong>
              {c.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </Box>
        {user?.result?.name && (
          <div style={{ width: '70%' }}>
            <Typography gutterBottom variant='h6'>
              Write a Comment
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant='outlined'
              label='Comment'
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              className='bg-blue-500'
              style={{ marginTop: '10px' }}
              fullWidth
              disabled={!comment}
              variant='contained'
              onClick={handleClick}
              color='primary'>
              Comment
            </Button>
          </div>
        )}
      </Box>
    </div>
  )
}

export default CommentSection

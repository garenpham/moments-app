import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import {
  Box,
  Button,
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { deletePost, likePost } from '../../../actions/posts'
import { useAppDispatch } from '../../../hooks'
import { PostProps } from '../../../types'
import styles from './styles'

type Props = PostProps & {
  setCurrentId: React.Dispatch<React.SetStateAction<number>>
}

function Post({
  _id,
  name,
  title,
  message,
  tags,
  selectedFile,
  createdAt,
  likes,
  setCurrentId,
  creator,
}: Props) {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')!))

  const [clientLikes, setClientLikes] = React.useState(likes)

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')!))
  }, [location])

  const userId = user?.result.id || user?.result._id
  const hasLikedPost = likes?.find((like) => like === userId)

  const handleLike = async () => {
    dispatch(likePost(_id!))
    if (hasLikedPost) {
      setClientLikes(likes?.filter((id) => id !== userId))
    } else {
      setClientLikes([...likes!, userId])
    }
  }

  const Likes = () => {
    if (clientLikes)
      if (clientLikes.length > 0) {
        return clientLikes.find((like) => like === userId) ? (
          <>
            <ThumbUpAltIcon fontSize='small' />
            &nbsp;
            {clientLikes.length > 2
              ? `You and ${clientLikes.length - 1} others`
              : `${clientLikes.length} like${
                  clientLikes.length > 1 ? 's' : ''
                }`}
          </>
        ) : (
          <>
            <ThumbUpAltOutlined fontSize='small' />
            &nbsp;{clientLikes.length}{' '}
            {clientLikes.length === 1 ? 'Like' : 'Likes'}
          </>
        )
      }

    return (
      <>
        <ThumbUpAltOutlined fontSize='small' />
        &nbsp;Like
      </>
    )
  }

  const openPost = () => {
    navigate(`/posts/${_id}`)
  }

  return (
    <Card sx={styles.card} raised elevation={6}>
      <ButtonBase sx={styles.cardAction} onClick={openPost}>
        <CardMedia
          sx={styles.media}
          image={
            selectedFile ||
            'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
          }
          title={title}
        />
        <Box component={'div'} sx={styles.overlay}>
          <Typography variant='h6'>{name}</Typography>
          <Typography variant='body2'>{moment(createdAt).fromNow()}</Typography>
        </Box>

        <Box component='div' sx={styles.details}>
          <Typography variant='body2' color='textSecondary'>
            {tags.map((tag) => `#${tag} `)}
          </Typography>
        </Box>

        <Typography sx={styles.title} variant='h5' gutterBottom>
          {title}
        </Typography>

        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions sx={styles.cardActions}>
        <Button
          size='small'
          color='primary'
          disabled={!user?.result}
          onClick={handleLike}>
          <Likes />
        </Button>

        {(user?.result.id === creator || user?.result._id === creator) && (
          <>
            <Box component='div' sx={styles.overlay2}>
              <Button
                style={{ color: 'white' }}
                size='small'
                onClick={() => {
                  setCurrentId(_id!)
                }}>
                <MoreHorizIcon fontSize='small' />
              </Button>
            </Box>
            <Button
              size='small'
              color='primary'
              onClick={() => {
                dispatch(deletePost(_id!))
              }}>
              <DeleteIcon fontSize='small' />
              Delete
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  )
}

export default Post;

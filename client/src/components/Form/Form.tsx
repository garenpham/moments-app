import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
// import FileBase from 'react-file-base64';
import imageCompression from 'browser-image-compression'
import { useLocation, useNavigate } from 'react-router-dom'
import { createPost, updatePost } from '../../actions/posts'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { PostProps } from '../../types'
import { convertBase64 } from '../../utils/convertBase64'
import styles from './styles'

type Props = {
  currentId: number
  setCurrentId: React.Dispatch<React.SetStateAction<number>>
}

function Form({ currentId, setCurrentId }: Props) {
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: [''],
    selectedFile: '',
  })

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')!))

  const post = useAppSelector((state) =>
    currentId
      ? state.posts.posts.find((p: PostProps) => p._id === currentId)
      : null
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (post) setPostData(post)
  }, [post])

  const location = useLocation()
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')!))
  }, [location])

  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (currentId) {
      dispatch(updatePost(currentId, { name: user?.result?.name, ...postData }))
    } else {
      dispatch(createPost({ name: user?.result?.name, ...postData }, navigate))
    }
    clear()
    // console.log(postData);
  }
  const clear = () => {
    setPostData({
      title: '',
      message: '',
      tags: [''],
      selectedFile: '',
    })
    setCurrentId(0)
  }

  if (!user?.result?.name)
    return (
      <Paper sx={styles.paper} elevation={6}>
        <Typography variant='h6' align='center'>
          Please Sign In to upload and share your amazing moments with us!
        </Typography>
      </Paper>
    )

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const options = {
      maxSizeMB: 0.064,
      useWebWorker: true,
    }
    const file = e.currentTarget.files![0]
    try {
      const compressedFile = await imageCompression(file, options)
      const base64 = (await convertBase64(compressedFile)) as string
      setPostData({ ...postData, selectedFile: base64 })
      // console.log(
      //   'compressedFile instanceof Blob',
      //   compressedFile instanceof Blob
      // ) // true
      // console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`) // smaller than maxSizeMB
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Paper sx={styles.paper} elevation={6}>
      <Box
        component='form'
        autoComplete='off'
        noValidate
        sx={[styles.root, styles.form]}
        onSubmit={handleSubmit}>
        <Typography variant='h6'>
          {!currentId ? 'Upload a Memorable Moment' : 'Editing Post'}
        </Typography>
        <TextField
          name='title'
          variant='outlined'
          label='Title'
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name='message'
          variant='outlined'
          label='Message'
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name='tags'
          variant='outlined'
          label='Tags'
          fullWidth
          value={postData.tags}
          autoComplete='off'
          onChange={(e) => {
            setPostData({
              ...postData,
              tags: e.target.value.trim().split(','),
            })
          }}
        />

        <Box component='div' sx={styles.fileInput}>
          {/* <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }: any) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          /> */}
          <input
            type='file'
            accept='capture=camera,image/*'
            onChange={uploadImage}
          />
        </Box>
        {postData.selectedFile && (
          <img
            src={postData.selectedFile}
            alt='image23'
            className='w-full h-auto'
          />
        )}
        <Button
          className='bg-blue-500'
          sx={styles.buttonSubmit}
          variant='contained'
          color='primary'
          size='large'
          type='submit'
          fullWidth>
          Submit
        </Button>
        <Button
          className='bg-red-400'
          variant='contained'
          color='error'
          size='small'
          onClick={clear}
          fullWidth>
          Clear
        </Button>
      </Box>
    </Paper>
  )
}

export default Form;

import { AppBar, Avatar, Box, Button, Toolbar, Typography } from '@mui/material'
import decode from 'jwt-decode'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { globalStyles } from '../../constants/globalStyles'
import { useAppDispatch } from '../../hooks'
import { decodedToken } from '../../types'
import styles from './styles'

type Props = {}

const Navbar = (props: Props) => {
  const profile = localStorage.getItem('profile')
  const [user, setUser] = useState(profile ? JSON.parse(profile) : null) //JSON.parse() converts a string (not null) to an object

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/')
    setUser(null)
    window.location.reload()
  }

  useEffect(() => {
    if (user?.token) {
      const token = user?.token
      const decodedToken: decodedToken = decode(token)
      if (decodedToken.exp * 1000 < new Date().getTime()) logout()
    }

    setUser(profile ? JSON.parse(profile) : null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, profile])

  return (
    <AppBar sx={styles.appBar} position='static' color='inherit'>
      <Box component={'div'} sx={styles.brandContainer}>
        <Typography
          className={`active:scale-95 ${globalStyles.longTransition}`}
          component={Link}
          to='/'
          sx={styles.heading}
          variant='h2'
          align='center'>
          Moments
        </Typography>
        <Box
          component='img'
          sx={styles.image}
          src={window.location.origin + '/moments-Logo.png'}
          alt='memories'
        />
      </Box>

      <Toolbar sx={styles.toolbar}>
        {user ? (
          <Box component={'div'} sx={styles.profile}>
            <div className={`flex items-center gap-[1rem]`}>
              <Avatar
                sx={styles.purple}
                alt={user.result.name}
                src={user.result?.picture}>
                {user.result.name.charAt(0)}
              </Avatar>
              <Typography sx={styles.userName} variant='h6'>
                {user.result.name}
              </Typography>
            </div>
            <Button
              variant='contained'
              sx={styles.logout}
              color='error'
              className='bg-red-400'
              onClick={logout}>
              Sign out
            </Button>
          </Box>
        ) : (
          <Button
            className='bg-blue-500'
            component={Link}
            to='/auth'
            variant='contained'
            color='primary'>
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar

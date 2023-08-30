import { createTheme } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

const theme = createTheme();

const styles = {
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '24px 10px',
      borderRadius: 4,
    },
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 10,
  },
  image: {
    marginLeft: '15px',
    height: '44px',
    [theme.breakpoints.down('md')]: {
      marginLeft: '4px',
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      width: 'auto',
      flexDirection: 'column',
      gap: '.4rem',
      alignItems: 'end',
      marginTop: '1rem',
    },
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  logout: {
    marginLeft: '20px',
  },
}
export default styles;

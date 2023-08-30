import { createTheme } from '@mui/material';

const theme = createTheme();

const styles = {
  gridContainer: {
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column-reverse',
    },
  },
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
}

export default styles;

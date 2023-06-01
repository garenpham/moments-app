import { createTheme } from '@mui/material';

const theme = createTheme();

const styles = {
	mainContainer: {
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column-reverse',
		},
	},
};

export default styles;

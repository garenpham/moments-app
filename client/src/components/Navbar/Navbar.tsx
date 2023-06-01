import {
	AppBar,
	Avatar,
	Box,
	Button,
	Toolbar,
	Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import memories from '../../images/memories.png';
import styles from './styles';

type Props = {};

const Navbar = (props: Props) => {
	const profile = localStorage.getItem('profile');
	const [user, setUser] = useState(profile ? JSON.parse(profile) : null); //JSON.parse() converts a string (not null) to an object

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const logout = () => {
		dispatch({ type: 'LOGOUT' });
		navigate('/');
		setUser(null);
	};

	useEffect(() => {
		setUser(profile ? JSON.parse(profile) : null);
	}, [location, profile]);

	return (
		<>
			<AppBar
				sx={styles.appBar}
				position="static"
				color="inherit">
				<Box
					component={'div'}
					sx={styles.brandContainer}>
					<Typography
						component={Link}
						to="/"
						sx={styles.heading}
						variant="h2"
						align="center">
						Moments
					</Typography>
					<Box
						component="img"
						sx={styles.image}
						src={memories}
						alt="memories"
					/>
				</Box>

				<Toolbar sx={styles.toolbar}>
					{user ? (
						<Box
							component={'div'}
							sx={styles.profile}>
							<Avatar
								sx={styles.purple}
								alt={user.name}
								src={user.picture}>
								{user.name.charAt(0)}
							</Avatar>
							<Typography
								sx={styles.userName}
								variant="h6">
								{user.name}
							</Typography>{' '}
							<Button
								variant="contained"
								sx={styles.logout}
								color="secondary"
								onClick={logout}>
								Sign out
							</Button>
						</Box>
					) : (
						<Button
							component={Link}
							to="/auth"
							variant="contained"
							color="primary">
							Sign in
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</>
	);
};

export default Navbar;

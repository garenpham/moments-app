import LockedOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
	Avatar,
	Box,
	Button,
	Container,
	Grid,
	Paper,
	Typography,
} from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchGoogleCredentials } from '../../api';
import { useAppDispatch } from '../../hooks';
import Input from './Input';
import Icon from './icon';
import styles from './styles';

type Props = {};

const Auth = (props: Props) => {
	const [showPassword, setShowPassword] = useState(false);
	const [isSignup, setIsSignup] = useState(false);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleSubmit = () => {};
	const handleChange = () => {};

	const handleShowPassword = () =>
		setShowPassword((prevShowPassword) => !prevShowPassword); //Previous state

	const switchMode = () => {
		setIsSignup((prevIsSignup) => !prevIsSignup);
		setShowPassword(false);
	};

	const googleSuccess = async (res: any) => {
		try {
			await fetchGoogleCredentials(res.access_token).then((response) => {
				const token = {
					exp: res.expires_in,
					...response,
				};
				// console.log(tokenExp);
				// console.log(credentials);
				dispatch({ type: 'AUTH', data: token });
				navigate('/');
			});
		} catch (error) {
			console.log(error);
		}
	};

	const googleError = () =>
		alert('Google Sign In was unsuccessful. Please refresh your browser.');

	const googleLogin = useGoogleLogin({
		onSuccess: (tokenResponse) => googleSuccess(tokenResponse),
		onError: googleError,
	});

	return (
		<Container
			component={'main'}
			maxWidth="xs">
			<Paper
				sx={styles.paper}
				elevation={3}>
				<Avatar sx={styles.avatar}>
					<LockedOutlinedIcon />
				</Avatar>
				<Typography variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
				<Box
					component="form"
					sx={styles.form}
					onSubmit={handleSubmit}>
					<Grid
						container
						spacing={2}>
						{isSignup && (
							<>
								<Input
									name="firstName"
									label="First Name"
									handleChange={handleChange}
									autoFocus
									half
								/>
								<Input
									name="lastName"
									label="Last Name"
									handleChange={handleChange}
									half
								/>
							</>
						)}
						<Input
							name="email"
							label="Email Address"
							handleChange={handleChange}
							type="email"
						/>
						<Input
							name="password"
							label="Password"
							handleChange={handleChange}
							type={showPassword ? 'text' : 'password'}
							handleShowPassword={handleShowPassword}
						/>

						{isSignup && (
							<Input
								name="confirmPassword"
								label="Confirm Your Password"
								handleChange={handleChange}
								type="password"
							/>
						)}
					</Grid>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						sx={styles.submit}>
						{isSignup ? 'Sign up' : 'Sign in'}
					</Button>

					{!isSignup && (
						<Button
							sx={styles.googleButton}
							color="primary"
							fullWidth
							onClick={() => googleLogin()}
							startIcon={<Icon />}
							variant="contained">
							Sign in with Google
						</Button>
					)}

					<Grid
						container
						justifyContent="flex-end">
						<Grid item>
							<Button
								style={{ fontSize: '10px' }}
								onClick={switchMode}>
								{isSignup
									? 'Already have an account? Sign in'
									: "Don't have an account? Sign Up"}
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Paper>
		</Container>
	);
};

export default Auth;

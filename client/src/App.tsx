import { Container } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import PostDetails from './components/PostDetails/PostDetails';

function App() {
	const user = JSON.parse(localStorage.getItem('profile')!);

	return (
		<GoogleOAuthProvider
			clientId={`${process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}`}>
			<BrowserRouter>
				<Container maxWidth="xl">
					<Navbar />
					<Routes>
						<Route
							path="/"
							element={
								<Navigate
									to="/posts"
									replace
								/>
							}
						/>
						<Route
							path="/posts"
							element={<Home />}
						/>
						<Route
							path="/posts/search"
							element={<Home />}
						/>
						<Route
							path="/posts/:id"
							element={<PostDetails />}
						/>
						<Route
							path="/auth"
							element={
								!user ? (
									<Auth />
								) : (
									<Navigate
										to="/posts"
										replace
									/>
								)
							}
						/>
					</Routes>
				</Container>
			</BrowserRouter>
		</GoogleOAuthProvider>
	);
}

export default App;

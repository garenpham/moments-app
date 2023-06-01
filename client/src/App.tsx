import { Container } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';

function App() {
	return (
		<GoogleOAuthProvider
			clientId={`${process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}`}>
			<BrowserRouter>
				<Container maxWidth="lg">
					<Navbar />
					<Routes>
						<Route
							path="/"
							element={<Home />}
						/>
						<Route
							path="/auth"
							element={<Auth />}
						/>
					</Routes>
				</Container>
			</BrowserRouter>
		</GoogleOAuthProvider>
	);
}

export default App;

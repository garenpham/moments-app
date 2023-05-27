import { AppBar, Box, Container, Grid, Grow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getPosts } from './actions/posts';
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';
import { useAppDispatch } from './hooks';
import memories from './images/memories.png';
import styles from './styles';

function App() {
	const [currentId, setCurrentId] = useState<number>(0);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

	return (
		<Container maxWidth="lg">
			<AppBar
				sx={styles.appBar}
				position="static"
				color="inherit">
				<Typography
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
			</AppBar>
			<Grow in>
				<Container>
					<Grid
						container
						justifyContent="space-between"
						alignItems="stretch"
						spacing={3}>
						<Grid
							item
							xs={12}
							sm={7}>
							<Posts setCurrentId={setCurrentId} />
						</Grid>
						<Grid
							item
							xs={12}
							sm={4}>
							<Form
								currentId={currentId}
								setCurrentId={setCurrentId}
							/>
						</Grid>
					</Grid>
				</Container>
			</Grow>
		</Container>
	);
}

export default App;

import { Container, Grid, Grow } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import { getPosts } from '../../actions/posts';
import styles from './styles';

type Props = {};

const Home = (props: Props) => {
	const [currentId, setCurrentId] = useState<number>(0);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);
	return (
		<Grow in>
			<Container>
				<Grid
					sx={styles.mainContainer}
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
	);
};

export default Home;

import {
	AppBar,
	Button,
	Container,
	Grid,
	Grow,
	Paper,
	TextField,
} from '@mui/material';
import { MuiChipsInput } from 'mui-chips-input';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPosts } from '../../actions/posts';
import { useAppDispatch } from '../../hooks';
import Form from '../Form/Form';
import Paginate from '../Pagination/Paginate';
import Posts from '../Posts/Posts';
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
					sx={styles.gridContainer}
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
						<Paper elevation={6}>
							<Paginate />
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;

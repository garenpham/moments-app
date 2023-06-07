import {
	AppBar,
	Button,
	Container,
	Grid,
	Grow,
	Paper,
	TextField,
} from '@mui/material';
import { MuiChipsInput, MuiChipsInputProps } from 'mui-chips-input';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPosts } from '../../actions/posts';
import { useAppDispatch } from '../../hooks';
import Form from '../Form/Form';
import Paginate from '../Pagination/Paginate';
import Posts from '../Posts/Posts';
import styles from './styles';

type Props = {};

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const Home = (props: Props) => {
	const [currentId, setCurrentId] = useState<number>(0);
	const dispatch = useAppDispatch();

	const query = useQuery();
	const navigate = useNavigate();
	const page = query.get('page') || 1;
	const searchQuery = query.get('searchQuery');
	const [search, setSearch] = useState('');
	const [tags, setTags] = useState([]);

	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

	const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') {
		}
	};

	const handleAddChip = (chip: string) => {};
	const handleDeleteChip = (chip: string) => {};

	return (
		<Grow in>
			<Container maxWidth="xl">
				<Grid
					sx={styles.gridContainer}
					container
					justifyContent="space-between"
					alignItems="stretch"
					spacing={3}>
					<Grid
						item
						xs={12}
						sm={6}
						md={9}>
						<Posts setCurrentId={setCurrentId} />
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}
						md={3}>
						<AppBar
							sx={styles.appBarSearch}
							position="static"
							color="inherit">
							<TextField
								name="search"
								variant="outlined"
								label="Search Memories"
								onKeyDown={handleKeyPress}
								fullWidth
								value={search}
								onChange={(e) => {
									setSearch(e.target.value);
								}}
							/>
							<MuiChipsInput
								style={{ margin: '10px 0' }}
								value={tags}
								onAddChip={(chip) => handleAddChip(chip)}
								onDeleteChip={(chip) => handleDeleteChip(chip)}
							/>
						</AppBar>
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

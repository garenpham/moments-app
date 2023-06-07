import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { Link } from 'react-router-dom';
import styles from './styles';

type Props = {};

const Paginate = (props: Props) => {
	return (
		<Pagination
			sx={styles.row}
			count={5}
			page={1}
			variant="outlined"
			color="primary"
			renderItem={(item) => (
				<PaginationItem
					{...item}
					component={Link}
					to={`/posts?page=${1}`}
				/>
			)}
		/>
	);
};

export default Paginate;

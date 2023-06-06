import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import styles from './styles';
import { Link } from 'react-router-dom';

type Props = {};

const Paginate = (props: Props) => {
	return (
		<Pagination
			classes={{ ul: styles.ul }}
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

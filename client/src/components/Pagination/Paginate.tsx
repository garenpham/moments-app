import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../../actions/posts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import styles from './styles';

type Props = {
  page: any;
};

const Paginate = ({ page }: Props) => {
  const { numberOfPages } = useAppSelector<any>(state => state.posts);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [dispatch, page]);

  return (
    <Pagination
      sx={styles}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={item => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;

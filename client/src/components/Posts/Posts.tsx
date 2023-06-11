import { CircularProgress, Grid } from '@mui/material';
import { useAppSelector } from '../../hooks';
import { PostProps } from '../../types';
import Post from './Post/Post';
import styles from './styles';

type Props = {
  setCurrentId: React.Dispatch<React.SetStateAction<number>>;
};

function Posts({ setCurrentId }: Props) {
  const { posts, isLoading } = useAppSelector(state => state.posts);

  // console.log(posts);

  if (!posts.length && !isLoading)
    return <h1>'Be the first one to share your moment!'</h1>;

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid sx={styles.mainContainer} container alignItems="stretch" spacing={3}>
      {posts.map(
        ({
          _id,
          name,
          title,
          message,
          tags,
          selectedFile,
          likes,
          createdAt,
          creator,
        }: PostProps) => (
          <Grid key={_id} item xs={12} sm={12} md={6} lg={3}>
            <Post
              _id={_id}
              name={name}
              title={title}
              message={message}
              tags={tags}
              selectedFile={selectedFile}
              likes={likes}
              createdAt={createdAt}
              setCurrentId={setCurrentId}
              creator={creator}
            />
          </Grid>
        ),
      )}
    </Grid>
  );
}

export default Posts;

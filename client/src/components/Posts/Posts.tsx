import { Box, CircularProgress, Grid } from '@mui/material';
import { useAppSelector } from '../../hooks';
import { PostProps } from '../../types';
import Post from './Post/Post';
import styles from './styles';

type Props = {
	setCurrentId: React.Dispatch<React.SetStateAction<number>>;
};

function Posts({ setCurrentId }: Props) {
	const posts = useAppSelector((state) => state.posts);

	return !posts.length ? (
		<CircularProgress />
	) : (
		<Grid
			sx={styles.mainContainer}
			container
			alignItems="stretch"
			spacing={3}>
			{posts.map(
				({
					_id,
					creator,
					title,
					message,
					tags,
					selectedFile,
					createdAt,
					likeCount,
				}: PostProps) => (
					<Grid
						key={_id}
						item
						xs={12}
						sm={6}>
						<Post
							_id={_id}
							creator={creator}
							title={title}
							message={message}
							tags={tags}
							selectedFile={selectedFile}
							createdAt={createdAt}
							likeCount={likeCount}
							setCurrentId={setCurrentId}
						/>
					</Grid>
				),
			)}
		</Grid>
	);
}

export default Posts;

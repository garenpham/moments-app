import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
} from '@mui/material';
import moment from 'moment';
import { PostProps } from '../../../types';
import styles from './styles';

type Props = PostProps & {
	setCurrentId: React.Dispatch<React.SetStateAction<number>>;
};

function Post({
	_id,
	creator,
	title,
	message,
	tags,
	selectedFile,
	createdAt,
	likeCount,
	setCurrentId,
}: Props) {
	return (
		<Card sx={styles.card}>
			<CardMedia
				sx={styles.media}
				image={selectedFile}
				title={title}
			/>
			<Box
				component={'div'}
				sx={styles.overlay}>
				<Typography variant="h6">{creator}</Typography>
				<Typography variant="body2">{moment(createdAt).fromNow()}</Typography>
			</Box>

			<Box
				component="div"
				sx={styles.overlay2}>
				<Button
					style={{ color: 'white' }}
					size="small"
					onClick={() => setCurrentId(_id)}>
					<MoreHorizIcon fontSize="small" />
				</Button>
			</Box>

			<Box
				component="div"
				sx={styles.details}>
				<Typography
					variant="body2"
					color="text Secondary">
					{tags.map((tag) => `#${tag} `)}
				</Typography>
			</Box>

			<CardContent>
				<Typography
					sx={styles.title}
					variant="h5"
					gutterBottom>
					{message}
				</Typography>
			</CardContent>

			<CardActions sx={styles.cardActions}>
				<Button
					size="small"
					color="primary"
					onClick={() => {}}>
					<ThumbUpAltIcon fontSize="small" />
					Like
					{likeCount}
				</Button>

				<Button
					size="small"
					color="primary"
					onClick={() => {}}>
					<DeleteIcon fontSize="small" />
					Delete
				</Button>
			</CardActions>
		</Card>
	);
}

export default Post;

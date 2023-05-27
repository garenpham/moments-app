import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import FileBase from 'react-file-base64';
import { createPost } from '../../actions/posts';
import { useAppDispatch } from '../../hooks';
import { PostCreateProps } from '../../types';
import styles from './styles';

type Props = {
	currentId: number;
	setCurrentId: React.Dispatch<React.SetStateAction<number>>;
};

function Form({ currentId, setCurrentId }: Props) {
	const [postData, setPostData] = useState<PostCreateProps>({
		creator: '',
		title: '',
		message: '',
		tags: [''],
		selectedFile: '',
	});

	const [tagInput, setTagInput] = useState('');

	const dispatch = useAppDispatch();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(createPost(postData));
		console.log(postData);
	};
	const clear = () => {};

	return (
		<Paper sx={styles.paper}>
			<Box
				component="form"
				autoComplete="off"
				noValidate
				sx={[styles.root, styles.form]}
				onSubmit={handleSubmit}>
				<Typography variant="h6">Upload a Memorable Moment</Typography>
				<TextField
					name="creator"
					variant="outlined"
					label="Creator"
					fullWidth
					value={postData.creator}
					onChange={(e) =>
						setPostData({ ...postData, creator: e.target.value })
					}
				/>
				<TextField
					name="title"
					variant="outlined"
					label="Title"
					fullWidth
					value={postData.title}
					onChange={(e) => setPostData({ ...postData, title: e.target.value })}
				/>
				<TextField
					name="message"
					variant="outlined"
					label="Message"
					fullWidth
					value={postData.message}
					onChange={(e) =>
						setPostData({ ...postData, message: e.target.value })
					}
				/>
				<TextField
					name="tags"
					variant="outlined"
					label="Tags"
					fullWidth
					value={postData.tags}
					autoComplete="off"
					onChange={(e) => {
						setPostData({
							...postData,
							tags: e.target.value.trim().split(','),
						});
					}}
				/>

				<Box
					component="div"
					sx={styles.fileInput}>
					<FileBase
						type="file"
						multiple={false}
						onDone={({ base64 }: any) =>
							setPostData({ ...postData, selectedFile: base64 })
						}
					/>
				</Box>
				<Button
					sx={styles.buttonSubmit}
					variant="contained"
					color="primary"
					size="large"
					type="submit"
					fullWidth>
					Submit
				</Button>
				<Button
					variant="contained"
					color="secondary"
					size="small"
					onClick={clear}
					fullWidth>
					Clear
				</Button>
			</Box>
		</Paper>
	);
}

export default Form;

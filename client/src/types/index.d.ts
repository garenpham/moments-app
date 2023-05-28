type PostProps = {
	_id?: number;
	createdAt?: Date;
	likeCount?: number;
	creator: string;
	title: string;
	message: string;
	tags: string[];
	selectedFile: string;
};

interface IAction {
	type: string;
	payload: PostProps;
}

interface IDelete {
	type: string;
	payload: number;
}

export { IAction, IDelete, PostProps };

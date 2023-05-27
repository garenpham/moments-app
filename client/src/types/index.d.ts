type PostCreateProps = {
	creator: string;
	title: string;
	message: string;
	tags: string[];
	selectedFile: string;
};

type PostProps = PostCreateProps & {
	_id: number;
	createdAt: Date;
	likeCount: number;
};

interface IActions {
	FETCH_ALL: string;
	CREATE: string;
}

interface IFetchAll {
	type: IActions['FETCH_ALL'];
	payload: any;
}

interface ICreate {
	type: IActions['CREATE'];
	payload: any;
}

export { ICreate, IFetchAll, PostCreateProps, PostProps };

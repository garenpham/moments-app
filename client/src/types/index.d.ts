type PostProps = {
	_id?: number;
	createdAt?: Date;
	likes?: [String];
	creator?: string;
	title: string;
	message: string;
	tags: string[];
	selectedFile: string;
	name: string;
};

interface IAction {
	type: string;
	payload: PostProps;
}

interface IDelete {
	type: string;
	payload: number;
}

type formData = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
};

export { IAction, IDelete, PostProps, formData };

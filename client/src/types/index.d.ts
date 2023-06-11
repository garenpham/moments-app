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
  payload?: PostProps;
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

type decodedToken = {
  email: string;
  exp: number;
  iat: number;
  id: string;
};

type searchQueryProps = {
  search: string;
  tags: string;
};

interface ISearchAction {
  type: string;
  payload?: searchQueryProps;
}

type statePosts = {
  posts: PostProps[];
  isLoading: boolean;
  post?: PostProps;
};

export {
  IAction,
  IDelete,
  ISearchAction,
  PostProps,
  decodedToken,
  formData,
  searchQueryProps,
  statePosts,
};

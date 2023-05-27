import { AnyAction } from '@reduxjs/toolkit';

const posts = (posts = [], action: AnyAction) => {
	switch (action.type) {
		case 'FETCH_ALL':
			return action.payload;
		case 'CREATE':
			return [...posts, action.payload];
		default:
			return posts;
	}
};

export default posts;

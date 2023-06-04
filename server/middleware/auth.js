import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
	try {
		let isCustomAuth, token;
		if (req.headers.authorization.split(' ')[0] === 'Bearer') {
			token = req.headers.authorization.split(' ')[1];
			isCustomAuth = true;
		} else {
			isCustomAuth = false;
		}

		/**
		 * Get the correct user id and bind it to req.userId
		 */
		if (isCustomAuth) {
			const decodedData = jwt.verify(token, process.env.TOKEN_SECRET);
			req.userId = decodedData?.id;
		} else {
			req.userId = req.headers.authorization;
		}
		next(); //next is a callback function that we have to call after we are done with the middleware
	} catch (error) {
		console.log(req._id);
		console.log(error);
	}
};

export default auth;

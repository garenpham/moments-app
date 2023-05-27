import bodyParser from 'body-parser';
import cors from 'cors';
import {} from 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.js';

const app = express();

app.use(bodyParser.json({ limit: '40mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '40mb', extended: true }));
app.use(cors());

app.use('/', postRoutes);

const PORT = process.env.PORT || 4000;

mongoose
	.connect(process.env.CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() =>
		app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)),
	)
	.catch((error) => console.log(`${error} did not connect`));

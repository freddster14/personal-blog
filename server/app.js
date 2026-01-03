import express from 'express';
import cors from 'cors';
import homeRoutes from './routes/home.js';
import blogRoutes  from './routes/blog.js';
import commentRoutes from './routes/comment.js';

const PORT = 3000;
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', homeRoutes);
app.use('/b', blogRoutes);
app.use('/c', commentRoutes);

app.listen(PORT, () => {console.log('Sever Running')});
import express from 'express';
import cors from 'cors';
import homeRoutes from './routes/home.js';
import blogRoutes  from './routes/blog.js';
import commentRoutes from './routes/comment.js';

const PORT = 3000;
const app = express();
const corsOptions = {
  origin: 'https://personal-blog-sepia-iota.vercel.app/',
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}


app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', homeRoutes);
app.use('/b', blogRoutes);
app.use('/c', commentRoutes);

app.listen(PORT, () => {console.log('Sever Running')});
import { Router } from 'express';
import { verifyTokenOptional, verifyTokenRequired } from '../middleware/auth.js';
import * as controller from '../controllers/blog.js';
const blog = Router();

blog.get('/', controller.latest)
blog.get('/all', verifyTokenOptional, controller.getAll);
blog.get('/:slug', verifyTokenOptional, controller.getOne);
blog.get('/edit/:slug', verifyTokenRequired, controller.edit);

blog.post('/create', verifyTokenRequired, controller.create);
blog.delete('/:slug', verifyTokenRequired, controller.deleteBlog);
blog.put('/:slug', verifyTokenRequired, controller.update);

export default blog;
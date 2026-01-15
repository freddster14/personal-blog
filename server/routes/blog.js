import { Router } from 'express';
import { verifyToken } from '../middleware/auth.js';
import * as controller from '../controllers/blog.js';
const blog = Router();

blog.get('/', controller.latest)
blog.get('/all', verifyToken, controller.getAll);
blog.get('/create', verifyToken, controller.getForm);
blog.get('/:slug', verifyToken, controller.getOne);
blog.get('/edit/:slug', verifyToken, controller.edit);

blog.post('/create', verifyToken, controller.create);
blog.delete('/:slug', verifyToken, controller.deleteBlog);
blog.put('/:slug', verifyToken, controller.update);

export default blog;
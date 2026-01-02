import { Router } from 'express';
import { verifyToken } from '../middleware/auth.js';
import * as controller from '../controllers/blog.js';
const blog = Router();

blog.get('/', controller.latest)
blog.get('/all', controller.getAll);
blog.get('/:slug', controller.getOne);
blog.get('/create', verifyToken, controller.getForm);
blog.get('/edit/:slug', verifyToken, controller.edit);

blog.post('/', verifyToken, controller.create);
blog.delete('/:slug', verifyToken, controller.deleteBlog);
blog.put('/:slug', verifyToken, controller.update);

export default blog;
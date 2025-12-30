import { Router } from 'express';
import * as controller from '../controllers/blog.js';
const blog = Router();

blog.get('/', controller.latest)
blog.get('/all', controller.getAll);
blog.get('/:slug', controller.getOne);
blog.get('/create', controller.getForm);
blog.get('/edit/:slug', controller.edit);

blog.post('/', controller.create);
blog.delete('/:slug', controller.deleteBlog);
blog.put('/:slug', controller.update);

export default blog;
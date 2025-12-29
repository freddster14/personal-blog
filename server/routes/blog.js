import { Router } from 'express';
import * as controller from '../controllers/blog.js';
const blog = Router();

blog.get('/', controller.latest)
blog.get('/all', controller.getAll);
blog.get('/:id', controller.getOne);
blog.get('/create', controller.getForm);
blog.get('/edit/:id', controller.edit);

blog.post('/', controller.create);
blog.delete('/:id', controller.deleteBlog);
blog.put('/:id', controller.update);

export default blog;
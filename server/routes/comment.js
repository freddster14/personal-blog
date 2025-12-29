import { Router } from 'express';
import * as controller from '../controllers/comment.js';
const comment = Router();

comment.get('/:id', controller.getBlogComments)
comment.post('/', controller.create);
comment.delete('/:id', controller.deleteComment)

export default comment;
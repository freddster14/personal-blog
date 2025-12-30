import { Router } from 'express';
import * as controller from '../controllers/comment.js';
const comment = Router();

comment.get('/:blogId', controller.getBlogComments)
comment.post('/:blogId', controller.create);
comment.delete('/:id', controller.deleteComment)

export default comment;
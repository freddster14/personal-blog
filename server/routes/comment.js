import { Router } from 'express';
import * as controller from '../controllers/comment.js';
import { verifyToken } from '../middleware/auth.js';
const comment = Router();

comment.get('/:slug', controller.getBlogComments)
comment.post('/:slug', verifyToken, controller.create);
comment.delete('/:id', verifyToken, controller.deleteComment)

export default comment;
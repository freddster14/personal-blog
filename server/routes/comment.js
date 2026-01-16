import { Router } from 'express';
import * as controller from '../controllers/comment.js';
import { verifyTokenOptional, verifyTokenRequired } from '../middleware/auth.js';
const comment = Router();

comment.get('/:slug', controller.getBlogComments)
comment.post('/:slug', verifyTokenRequired, controller.create);
comment.delete('/:id', verifyTokenRequired, controller.deleteComment)

export default comment;
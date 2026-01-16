import { Router } from 'express';
import * as controller from '../controllers/home.js';
import { verifyTokenOptional } from '../middleware/auth.js';
const home = Router();

home.get('/me', verifyTokenOptional, controller.getMe);

home.post('/sign-up', controller.create);
home.post('/login', controller.loginUser);

export default home;
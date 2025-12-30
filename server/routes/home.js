import { Router } from 'express';
import * as controller from '../controllers/home.js';
const home = Router();

home.get('/', controller.home);
home.get('/about', controller.about);
home.get('/sign-up', controller.signup);
home.get('/login', controller.login);

home.post('/sign-up', controller.create);
home.post('/login', controller.loginUser);
home.post('/logout', controller.logout);

export default home;
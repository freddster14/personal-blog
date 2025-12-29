import { Router } from 'express';
import * as controller from '../controllers/home.js';
const home = Router();

home.get('/', controller.home);
home.get('/about', controller.about)

export default home;
const { Router } = require('express');
const controller = require('../controllers/blog');
const blog = Router();

blog.get('/', controller.getAll);
blog.get('/:id', controller.getOne);

blog.post('/', controller.create);
blog.delete('/:id', controller.delete);
blog.put('/:id', controller.update);

module.exports = blog;
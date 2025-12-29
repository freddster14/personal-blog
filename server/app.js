const express = require('express');
const app = express();
const home = require('./routes/home');
const blog = require('./routes/blog')
const PORT = 3000;

app.use('/', home);
app.use('/b', blog);

app.listen(PORT)
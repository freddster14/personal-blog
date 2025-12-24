const express = require('express');
const app = express();

const PORT = 3000;

app.use('/', (req,res) => res.send('ehjff'))

app.listen(PORT)
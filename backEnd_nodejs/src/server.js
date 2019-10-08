const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const routes = require('./routes.js');

const app = express();
app.use(cors());
app.use('/files', express.static(path.resolve(__dirname, '..','uploads')));
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/nodeapi', { 
    useNewUrlParser:true,
    useUnifiedTopology:true,
 });
app.use(routes);
app.listen(3001);
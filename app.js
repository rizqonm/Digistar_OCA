require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');
const ocaRoutes = require('./routes/ocas');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());

app.use(express.json());

connectDB();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/auth', authRoutes);
app.use('/oca', ocaRoutes); 

module.exports = app;
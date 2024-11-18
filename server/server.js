const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Ensure this path is correct
const AuthRouter=require('./Routes/AuthRouter')
const AdminRouter=require('./Routes/AdminRoutes');
const bodyParser = require('body-parser');
const bookRoutes = require('./Routes/bookRoutes');
const userRoutes= require('./Routes/UserRoutes');
const ContactRoutes= require('./Routes/ContactRoutes');
const errorMiddleware = require('./Middlewares/errorMiddleware');
const issueRoutes = require('./Routes/IssueRoutes');
const dashboard=require('./Routes/DashBoard')
const returnRoutes = require('./Routes/ReturnRoutes');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/bookstore", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error: ', err));



app.use('/auth',AuthRouter)
app.use('/admin',AdminRouter);
app.use('/api/books', bookRoutes);
app.use('/api', userRoutes);
app.use('/api',ContactRoutes);
app.use('/api/issue', issueRoutes);
app.use('/api/dashboard', dashboard);
app.use('/api/return', returnRoutes);

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

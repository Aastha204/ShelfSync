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
const bookTrackerRoutes = require('./Routes/bookTrackerRoutes');
const todoRoutes = require("./Routes/todoRoutes");
const cron = require('node-cron');
const { updateStatistics } = require('./Controllers/statisticsController');
const statisticsRoute=require('./Routes/statisticsRoute');
const receiptRoutes=require('./Routes/ReceiptRoutes')
const reviewRoutes = require("./Routes/ReviewRoutes");
const PaymentRoutes = require("./Routes/PaymentRoutes");

require('dotenv').config();
cron.schedule('0 0 * * *', async () => {
  await updateStatistics();
});

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
app.use('/api/issues', issueRoutes);
app.use('/api/dashboard', dashboard);
app.use('/api/return', returnRoutes);
app.use('/api/bookTracker', bookTrackerRoutes);
app.use("/todos", todoRoutes);
app.use('/api/statistics',statisticsRoute);
app.use('/api/receipts', receiptRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/payment", PaymentRoutes);


// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const BookModel = require('./Models/Book'); // Ensure this path is correct
const AuthRouter=require('./Routes/AuthRouter')
const AdminRouter=require('./Routes/AdminRoutes');


require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/bookstore", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error: ', err));

// Add a new book
app.post("/books/add", (req, res) => {
  const { name, author, ratePerMonth, available } = req.body;
  console.log("Adding book with data:", req.body); // Debug log

  const newBook = new BookModel({
    name,
    author,
    ratePerMonth,
    available
  });

  newBook.save()
    .then(result => res.json(result))
    .catch(err => {
      console.error("Error adding book:", err); // Debug log
      res.status(500).json(err);
    });
});

// Get all books
app.get("/books", (req, res) => {
  BookModel.find()
    .then(result => res.json(result))
    .catch(err => {
      console.error("Error fetching books:", err); // Debug log
      res.status(500).json(err);
    });
});

// Update a book
app.put("/books/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, author, ratePerMonth, available } = req.body;
  console.log("Updating book with ID:", id, "Data:", req.body); // Debug log

  BookModel.findByIdAndUpdate(id, { name, author, ratePerMonth, available }, { new: true })
    .then(result => {
      if (!result) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json(result);
    })
    .catch(err => {
      console.error("Error updating book:", err); // Debug log
      res.status(500).json(err);
    });
});

// Delete a book
app.delete("/books/delete/:id", (req, res) => {
  const { id } = req.params;
  console.log("Attempting to delete book with ID:", id); // Debug log

  BookModel.findByIdAndDelete(id)
    .then(result => {
      if (!result) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json({ message: 'Book deleted', result });
    })
    .catch(err => {
      console.error("Error deleting book:", err); // Debug log
      res.status(500).json(err);
    });
});

app.use('/auth',AuthRouter)
app.use('/admin',AdminRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

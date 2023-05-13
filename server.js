const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Parse JSON requests
app.use(bodyParser.json());

// Define the list of books
let books = [
  { id: 1, title: 'Autobiography of a yogi', author: 'Paramhansa Yogananda' },
  { id: 2, title: 'Meeting God', author: 'Stephen Huyler' },
  { id: 3, title: 'Think on These Things', author: 'Jiddu Krishnamurti' },
  { id: 4, title: 'The Yoga Sutras of Patanjali', author: 'Sri Swami Satchidananda'},
  { id: 5, title: 'Hinduism', author: 'Jeananne Fowler'},
];

// Define routes for the API
app.get('/books', (req, res) => {
  res.json(books);
});

app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((book) => book.id === id);
  if (!book) {
    res.status(404).send('Book not found');
  } else {
    res.json(book);
  }
});

app.post('/books', (req, res) => {
  const book = req.body;
  book.id = books.length + 1;
  books.push(book);
  res.status(201).json(book);
});

app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex === -1) {
    res.status(404).send('Book not found');
  } else {
    const book = req.body;
    book.id = id;
    books[bookIndex] = book;
    res.json(book);
  }
});

app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex === -1) {
    res.status(404).send('Book not found');
  } else {
    books.splice(bookIndex, 1);
    res.status(204).send();
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});




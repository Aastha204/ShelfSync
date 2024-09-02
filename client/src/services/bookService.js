import axios from 'axios';

const API_URL = 'http://localhost:4000/books';

export const addBook = (book) => axios.post(`${API_URL}/add`, book);
export const getBooks = () => axios.get(`${API_URL}/all`);
export const editBook = (id, updates) => axios.put(`${API_URL}/edit/${id}`, updates);
export const deleteBook = (id) => axios.delete(`${API_URL}/delete/${id}`);

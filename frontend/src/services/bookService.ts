import api from './api';

export interface Book {
  id: number;
  title: string;
  author: string;
  description?: string;
  coverImage?: string;
  publishedYear?: number;
  genre?: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface BookFormData {
  title: string;
  author: string;
  description?: string;
  coverImage?: string;
  publishedYear?: number;
  genre?: string;
}

export const getAllBooks = async (): Promise<Book[]> => {
  const response = await api.get('/api/books');
  return response.data;
};

export const getBookById = async (id: number): Promise<Book> => {
  const response = await api.get(`/api/books/${id}`);
  return response.data;
};

export const createBook = async (bookData: BookFormData): Promise<Book> => {
  const response = await api.post('/api/books', bookData);
  return response.data;
};

export const updateBook = async (id: number, bookData: BookFormData): Promise<Book> => {
  const response = await api.put(`/api/books/${id}`, bookData);
  return response.data;
};

export const deleteBook = async (id: number): Promise<void> => {
  await api.delete(`/api/books/${id}`);
}; 
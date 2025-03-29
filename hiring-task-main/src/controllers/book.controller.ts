import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';

// Get all books for the current user
export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.user?.userId || '0');
    
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const books = await prisma.book.findMany({
      where: { userId }
    });
    
    res.json(books);
  } catch (error) {
    next(error);
  }
};

// Get a single book by ID
export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.user?.userId || '0');
    const bookId = parseInt(req.params.id);
    
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const book = await prisma.book.findUnique({
      where: {
        id: bookId,
        userId: userId
      }
    });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    next(error);
  }
};

// Create a new book
export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, author, description, coverImage, publishedYear, genre } = req.body;
    const userId = parseInt(req.user?.userId || '0');
    
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const book = await prisma.book.create({
      data: {
        title,
        author,
        description,
        coverImage,
        publishedYear,
        genre,
        userId
      }
    });

    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

// Update an existing book
export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, author, description, coverImage, publishedYear, genre } = req.body;
    const userId = parseInt(req.user?.userId || '0');
    const bookId = parseInt(req.params.id);
    
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    // First check if the book exists and belongs to the user
    const existingBook = await prisma.book.findFirst({
      where: {
        id: bookId,
        userId
      }
    });
    
    if (!existingBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    // Update the book
    const updatedBook = await prisma.book.update({
      where: {
        id: bookId
      },
      data: {
        title,
        author,
        description,
        coverImage,
        publishedYear,
        genre
      }
    });

    res.json(updatedBook);
  } catch (error) {
    next(error);
  }
};

// Delete a book
export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.user?.userId || '0');
    const bookId = parseInt(req.params.id);
    
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    // First check if the book exists and belongs to the user
    const existingBook = await prisma.book.findFirst({
      where: {
        id: bookId,
        userId
      }
    });
    
    if (!existingBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    // Delete the book
    await prisma.book.delete({
      where: {
        id: bookId
      }
    });

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    next(error);
  }
}; 
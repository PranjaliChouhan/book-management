import { Router } from 'express';
import { 
  getBooks, 
  getBookById, 
  createBook, 
  updateBook, 
  deleteBook 
} from '../controllers/book.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// All book routes require authentication
router.use(authenticate);

// Get all books
router.get('/', getBooks);

// Get a single book
router.get('/:id', getBookById);

// Create a new book
router.post('/', createBook);

// Update a book
router.put('/:id', updateBook);

// Delete a book
router.delete('/:id', deleteBook);

export default router; 
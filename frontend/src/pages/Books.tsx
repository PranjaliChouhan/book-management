import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllBooks, deleteBook, Book } from '../services/bookService';
import BookCard from '../components/BookCard';

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await getAllBooks();
      setBooks(data);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching books:', err);
      
      // Check if this is an authentication error (401 Unauthorized)
      if (err.response && err.response.status === 401) {
        // Redirect to login page
        window.location.href = '/auth';
        return;
      }
      
      setError('Failed to load books. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
        setBooks(books.filter((book) => book.id !== id));
      } catch (err) {
        console.error('Error deleting book:', err);
        setError('Failed to delete book. Please try again later.');
      }
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading books...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-3 sm:mb-0">My Books</h1>
        <Link to="/books/add" className="btn btn-primary w-full sm:w-auto">
          Add New Book
        </Link>
      </div>

      {books.length === 0 ? (
        <div className="text-center p-8 bg-gray-100 rounded-lg">
          <p className="mb-4">You don't have any books yet.</p>
          <Link to="/books/add" className="btn btn-primary">
            Add Your First Book
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Books; 
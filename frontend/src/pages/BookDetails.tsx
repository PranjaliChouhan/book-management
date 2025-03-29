import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBookById, deleteBook, Book } from '../services/bookService';

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Default image if none provided
  const defaultCoverImage = 'https://via.placeholder.com/300x400?text=No+Cover';

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const bookId = parseInt(id || '0');
        if (!bookId) {
          setError('Invalid book ID');
          return;
        }
        
        const data = await getBookById(bookId);
        setBook(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching book:', err);
        setError('Failed to load book details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    if (!book) return;
    
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(book.id);
        navigate('/books');
      } catch (err) {
        console.error('Error deleting book:', err);
        setError('Failed to delete book. Please try again later.');
      }
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading book details...</div>;
  }

  if (error || !book) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error || 'Book not found'}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to="/books" className="text-blue-600 hover:underline">
          &larr; Back to Books
        </Link>
      </div>

      <div className="card">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 mb-6 md:mb-0 md:mr-6 flex justify-center">
            <img
              src={book.coverImage || defaultCoverImage}
              alt={`Cover of ${book.title}`}
              className="max-h-80 w-auto rounded-md shadow-md object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = defaultCoverImage;
              }}
            />
          </div>
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
            <p className="text-xl text-gray-700 mb-4">by {book.author}</p>
            
            {book.genre && (
              <p className="mb-2">
                <span className="font-semibold">Genre:</span> {book.genre}
              </p>
            )}
            
            {book.publishedYear && (
              <p className="mb-4">
                <span className="font-semibold">Year:</span> {book.publishedYear}
              </p>
            )}
            
            {book.description && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-700 whitespace-pre-line">{book.description}</p>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row mt-6 space-y-3 sm:space-y-0 sm:space-x-4">
              <Link to={`/books/edit/${book.id}`} className="btn btn-primary w-full sm:w-auto">
                Edit Book
              </Link>
              <button onClick={handleDelete} className="btn btn-danger w-full sm:w-auto">
                Delete Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails; 
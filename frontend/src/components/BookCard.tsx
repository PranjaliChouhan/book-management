import { Link } from 'react-router-dom';
import { Book } from '../services/bookService';

interface BookCardProps {
  book: Book;
  onDelete: (id: number) => void;
}

const BookCard = ({ book, onDelete }: BookCardProps) => {
  // Default image if none provided
  const defaultCoverImage = 'https://via.placeholder.com/150x200?text=No+Cover';
  
  return (
    <div className="card flex flex-col h-full">
      <div className="flex-grow">
        {/* Book Cover Image */}
        <div className="mb-4 h-48 overflow-hidden flex justify-center">
          <img 
            src={book.coverImage || defaultCoverImage} 
            alt={`Cover of ${book.title}`}
            className="h-full object-contain rounded-md shadow-sm"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = defaultCoverImage;
            }}
          />
        </div>
        
        <h3 className="text-lg font-bold mb-2">{book.title}</h3>
        <p className="text-gray-600 mb-2">By {book.author}</p>
        {book.genre && <p className="text-sm text-gray-500 mb-2">Genre: {book.genre}</p>}
        {book.publishedYear && <p className="text-sm text-gray-500 mb-4">Year: {book.publishedYear}</p>}
        {book.description && (
          <p className="text-gray-700 mb-4 line-clamp-3 text-sm">{book.description}</p>
        )}
      </div>
      <div className="flex justify-between mt-4">
        <Link to={`/books/${book.id}`} className="btn btn-secondary">
          View
        </Link>
        <div className="space-x-2">
          <Link to={`/books/edit/${book.id}`} className="btn btn-primary">
            Edit
          </Link>
          <button
            onClick={() => onDelete(book.id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard; 
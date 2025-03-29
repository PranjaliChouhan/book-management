import { useState, useEffect, FormEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBookById, updateBook, BookFormData } from '../services/bookService';

const EditBook = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    description: '',
    coverImage: '',
    publishedYear: undefined,
    genre: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookId = parseInt(id || '0');
        if (!bookId) {
          setError('Invalid book ID');
          setLoading(false);
          return;
        }

        const book = await getBookById(bookId);
        setFormData({
          title: book.title,
          author: book.author,
          description: book.description || '',
          coverImage: book.coverImage || '',
          publishedYear: book.publishedYear,
          genre: book.genre || '',
        });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'publishedYear') {
      const year = value === '' ? undefined : parseInt(value);
      setFormData({ ...formData, [name]: year });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.author) {
      setError('Title and author are required');
      return;
    }
    
    try {
      setSaving(true);
      const bookId = parseInt(id || '0');
      if (!bookId) {
        setError('Invalid book ID');
        return;
      }
      
      await updateBook(bookId, formData);
      navigate(`/books/${bookId}`);
    } catch (err) {
      console.error('Error updating book:', err);
      setError('Failed to update book. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading book details...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link to={`/books/${id}`} className="text-blue-600 hover:underline">
          &larr; Back to Book Details
        </Link>
      </div>

      <div className="card">
        <h1 className="text-2xl font-bold mb-6">Edit Book</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="title" className="form-label">Title <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-input"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="author" className="form-label">Author <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="author"
                name="author"
                className="form-input"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="genre" className="form-label">Genre</label>
              <input
                type="text"
                id="genre"
                name="genre"
                className="form-input"
                value={formData.genre || ''}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="publishedYear" className="form-label">Year Published</label>
              <input
                type="number"
                id="publishedYear"
                name="publishedYear"
                className="form-input"
                value={formData.publishedYear || ''}
                onChange={handleChange}
                min="1000"
                max="2100"
              />
            </div>

            <div>
              <label htmlFor="coverImage" className="form-label">Cover Image URL</label>
              <input
                type="url"
                id="coverImage"
                name="coverImage"
                className="form-input"
                value={formData.coverImage || ''}
                onChange={handleChange}
                placeholder="https://example.com/book-cover.jpg"
              />
            </div>

            <div>
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="form-input"
                value={formData.description || ''}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="flex justify-end space-x-4 mt-4">
              <Link to={`/books/${id}`} className="btn btn-secondary">
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook; 
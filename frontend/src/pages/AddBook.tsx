import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createBook, BookFormData } from '../services/bookService';

const AddBook = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    description: '',
    coverImage: '',
    publishedYear: undefined,
    genre: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      setLoading(true);
      await createBook(formData);
      navigate('/books');
    } catch (err) {
      console.error('Error creating book:', err);
      setError('Failed to create book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link to="/books" className="text-blue-600 hover:underline">
          &larr; Back to Books
        </Link>
      </div>

      <div className="card">
        <h1 className="text-2xl font-bold mb-6">Add New Book</h1>

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
              <Link to="/books" className="btn btn-secondary">
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Adding...' : 'Add Book'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook; 
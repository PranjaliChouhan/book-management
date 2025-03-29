import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">Book Management App</Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden flex items-center"
            onClick={toggleMobileMenu}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/books" className="hover:text-blue-300">Books</Link>
                <Link to="/books/add" className="hover:text-blue-300">Add Book</Link>
                <span className="px-2">Hello, {user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/auth" className="btn btn-primary">
                Login / Register
              </Link>
            )}
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-2 flex flex-col space-y-3">
            {isAuthenticated ? (
              <>
                <Link to="/books" className="hover:text-blue-300 py-2" onClick={() => setMobileMenuOpen(false)}>Books</Link>
                <Link to="/books/add" className="hover:text-blue-300 py-2" onClick={() => setMobileMenuOpen(false)}>Add Book</Link>
                <div className="py-2">Hello, {user?.name}</div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="btn btn-secondary text-sm mt-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/auth" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>
                Login / Register
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 
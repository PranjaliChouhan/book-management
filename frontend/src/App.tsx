import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';

import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import BookDetails from './pages/BookDetails';
import Books from './pages/Books';

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route 
              path="/books/add" 
              element={
                <ProtectedRoute>
                  <AddBook />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/books/edit/:id" 
              element={
                <ProtectedRoute>
                  <EditBook />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/books/:id" 
              element={
                <ProtectedRoute>
                  <BookDetails />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/books" 
              element={
                <ProtectedRoute>
                  <Books />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/books" replace />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
};

export default App; 
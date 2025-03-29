import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

enum AuthMode {
  LOGIN = 'login',
  REGISTER = 'register'
}

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>(AuthMode.LOGIN);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already authenticated
  useEffect(() => {
    console.log("Auth component - isAuthenticated:", isAuthenticated);
    if (isAuthenticated) {
      console.log("Already authenticated, redirecting to /books");
      navigate('/books');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      console.log("Auth form submitted, mode:", mode);
      if (mode === AuthMode.LOGIN) {
        console.log("Attempting login with email:", email);
        await login(email, password);
        console.log("Login successful, navigating to /books");
      } else {
        console.log("Attempting registration with name:", name, "and email:", email);
        await register(name, email, password);
        console.log("Registration successful, navigating to /books");
      }
      console.log("About to navigate to /books");
      navigate('/books');
      console.log("Navigation called");
    } catch (err) {
      console.error("Authentication error:", err);
      setError('Authentication failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const toggleMode = () => {
    setMode(mode === AuthMode.LOGIN ? AuthMode.REGISTER : AuthMode.LOGIN);
    setError(null);
  };
  
  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="card">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {mode === AuthMode.LOGIN ? 'Login' : 'Create Account'}
        </h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {mode === AuthMode.REGISTER && (
            <div className="mb-4">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                id="name"
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Please wait...' : mode === AuthMode.LOGIN ? 'Login' : 'Register'}
          </button>
        </form>
        
        <div className="text-center mt-4">
          <button
            onClick={toggleMode}
            className="text-blue-600 hover:underline"
            type="button"
          >
            {mode === AuthMode.LOGIN ? 'Need an account? Register' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth; 
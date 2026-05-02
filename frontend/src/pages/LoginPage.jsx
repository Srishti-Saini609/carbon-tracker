import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md page-enter">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🌱 CarbonTracker</h1>
          <p className="text-white/80">Track your carbon footprint, save the planet</p>
        </div>

        <div className="card p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Welcome Back</h2>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm text-center font-medium fade-in-up" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="login-email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input 
                id="login-email"
                type="email" 
                className="input-field" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="demo@example.com"
                required
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="login-password" className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input 
                id="login-password"
                type="password" 
                className="input-field" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full spin-slow inline-block"></span>
                  Logging in...
                </span>
              ) : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-brand-dark font-semibold hover:text-brand-light transition-colors">
                Register
              </Link>
            </p>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-xl text-center">
            <p className="text-xs text-gray-500">
              <strong>Demo:</strong> demo@example.com / password123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

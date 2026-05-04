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
    <div className="min-h-screen flex items-center justify-center p-6 mesh-gradient">
      <div className="w-full max-w-[480px] page-enter">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/50 backdrop-blur-xl rounded-2xl border border-white shadow-sm mb-6">
            <span className="text-2xl">🌱</span>
            <span className="text-xl font-black text-primary tracking-tight">CarbonTracker</span>
          </div>
          <h1 className="text-4xl font-black text-primary mb-3 tracking-tight">Welcome Back</h1>
          <p className="text-gray-500 font-medium">Continue your journey towards a greener future.</p>
        </div>

        <div className="card p-10 shadow-2xl shadow-primary/5">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 text-sm text-center font-bold border border-red-100 fade-in-up" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="login-email" className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">Email Address</label>
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
              <label htmlFor="login-password" className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">Password</label>
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
              className="btn-primary w-full py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full spin-slow inline-block"></span>
                  Authenticating...
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center pt-8 border-t border-gray-100">
            <p className="text-sm text-gray-500 font-medium">
              New to CarbonTracker?{' '}
              <Link to="/register" className="text-primary font-black hover:text-accent-green transition-colors">
                Create Account
              </Link>
            </p>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-2xl text-center border border-gray-100">
            <p className="text-xs text-gray-400 font-bold">
              <span className="uppercase tracking-widest mr-2">Demo Credentials:</span>
              <span className="text-primary">demo@example.com / password123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

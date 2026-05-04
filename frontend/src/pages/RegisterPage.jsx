import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Client-side validation
    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters');
      setLoading(false);
      return;
    }

    try {
      await register(name.trim(), email.trim(), password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 mesh-gradient">
      <div className="w-full max-w-[520px] page-enter">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/50 backdrop-blur-xl rounded-2xl border border-white shadow-sm mb-6">
            <span className="text-2xl">🌱</span>
            <span className="text-xl font-black text-primary tracking-tight">CarbonTracker</span>
          </div>
          <h1 className="text-4xl font-black text-primary mb-3 tracking-tight">Join the Mission</h1>
          <p className="text-gray-500 font-medium">Start your journey towards a sustainable future.</p>
        </div>

        <div className="card p-10 shadow-2xl shadow-primary/5">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 text-sm text-center font-bold border border-red-100 fade-in-up" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="register-name" className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">Full Name</label>
              <input 
                id="register-name"
                type="text" 
                className="input-field" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="John Doe"
                required
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="register-email" className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">Email Address</label>
              <input 
                id="register-email"
                type="email" 
                className="input-field" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="register-password" className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">Secure Password</label>
              <input 
                id="register-password"
                type="password" 
                className="input-field" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••"
                required 
                minLength="6"
                autoComplete="new-password"
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
                  Processing...
                </span>
              ) : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 text-center pt-8 border-t border-gray-100">
            <p className="text-sm text-gray-500 font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-black hover:text-accent-green transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

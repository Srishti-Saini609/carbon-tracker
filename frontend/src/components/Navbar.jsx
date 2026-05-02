import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 ${
      isActive(path)
        ? 'bg-brand-dark text-white shadow-md'
        : 'text-gray-600 hover:bg-gray-100 hover:text-brand-dark'
    }`;

  return (
    <nav className="glass-nav py-3 px-4 sm:px-6 mb-8 transition-all duration-300" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-dark to-brand-light hover:scale-105 transition-transform duration-200"
          aria-label="CarbonTracker Home"
        >
          🌱 CarbonTracker
        </Link>
        
        {/* Mobile menu button */}
        {user && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        )}

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm font-medium text-gray-500 mr-2">
                Welcome, <span className="text-brand-dark font-semibold">{user.name}</span>
              </span>
              <Link to="/" className={navLinkClass('/')}>
                🏠 Home
              </Link>
              <Link to="/log-activity" className={navLinkClass('/log-activity')}>
                📝 Log Activity
              </Link>
              <Link to="/meter" className={navLinkClass('/meter')}>
                🌍 Carbon Meter
              </Link>
              <Link to="/progress" className={navLinkClass('/progress')}>
                📈 Progress
              </Link>
              <Link to="/global-insights" className={navLinkClass('/global-insights')}>
                🌍 Global Insights
              </Link>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 text-sm font-semibold rounded-lg transition-all duration-200 ml-2"
                aria-label="Logout"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/login"
              className="px-4 py-2 bg-brand-dark hover:bg-brand-light text-white text-sm font-semibold rounded-lg transition-all duration-200"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile nav dropdown */}
        {user && menuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100 md:hidden z-50 page-enter">
            <div className="flex flex-col p-4 gap-2">
              <span className="text-sm font-medium text-gray-500 pb-2 border-b border-gray-100">
                Welcome, <span className="text-brand-dark font-semibold">{user.name}</span>
              </span>
              <Link to="/" className={navLinkClass('/')} onClick={() => setMenuOpen(false)}>
                🏠 Home
              </Link>
              <Link to="/log-activity" className={navLinkClass('/log-activity')} onClick={() => setMenuOpen(false)}>
                📝 Log Activity
              </Link>
              <Link to="/meter" className={navLinkClass('/meter')} onClick={() => setMenuOpen(false)}>
                🌍 Carbon Meter
              </Link>
              <Link to="/progress" className={navLinkClass('/progress')} onClick={() => setMenuOpen(false)}>
                📈 Progress
              </Link>
              <Link to="/global-insights" className={navLinkClass('/global-insights')} onClick={() => setMenuOpen(false)}>
                🌍 Global Insights
              </Link>
              <button 
                onClick={() => { setMenuOpen(false); handleLogout(); }}
                className="px-4 py-2 bg-red-50 text-red-600 text-sm font-semibold rounded-lg transition-all duration-200 text-left mt-2"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
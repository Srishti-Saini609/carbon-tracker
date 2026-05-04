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
    `px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 flex items-center gap-2.5 ${
      isActive(path)
        ? 'bg-primary text-white shadow-xl shadow-primary/20 translate-y-[-1px]'
        : 'text-gray-500 hover:bg-white hover:text-primary hover:shadow-sm'
    }`;

  return (
    <nav className="glass-nav py-4 px-6 sm:px-10 mb-12 transition-all duration-500" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-black tracking-tight text-primary flex items-center gap-2 group"
          aria-label="CarbonTracker Home"
        >
          <span className="p-2 bg-accent-green/10 rounded-xl group-hover:scale-110 transition-transform duration-300">🌱</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-accent-gold">CarbonTracker</span>
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
              <div className="flex items-center gap-2 mr-4 px-3 py-1.5 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-6 h-6 rounded-full bg-accent-green/10 flex items-center justify-center text-[10px] text-accent-green font-bold uppercase">
                  {user.name.charAt(0)}
                </div>
                <span className="text-sm font-semibold text-gray-600">
                  {user.name}
                </span>
              </div>
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
              <Link to="/squads" className={navLinkClass('/squads')}>
                🤝 Squads
              </Link>
              <Link to="/global-insights" className={navLinkClass('/global-insights')}>
                🌍 Global Insights
              </Link>
              <button 
                onClick={handleLogout}
                className="px-5 py-2.5 bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-600 text-sm font-semibold rounded-xl transition-all duration-300 ml-2"
                aria-label="Logout"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/login"
              className="btn-primary"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile nav dropdown */}
        {user && menuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white/80 backdrop-blur-3xl shadow-2xl border-t border-gray-100 md:hidden z-50 page-enter overflow-hidden">
            <div className="flex flex-col p-6 gap-3">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-2">
                User Session
              </span>
              <div className="flex items-center gap-3 px-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent-green/10 flex items-center justify-center text-accent-green font-bold text-lg">
                  {user.name.charAt(0)}
                </div>
                <span className="text-primary font-bold">{user.name}</span>
              </div>
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
              <Link to="/squads" className={navLinkClass('/squads')} onClick={() => setMenuOpen(false)}>
                🤝 Squads
              </Link>
              <Link to="/global-insights" className={navLinkClass('/global-insights')} onClick={() => setMenuOpen(false)}>
                🌍 Global Insights
              </Link>
              <button 
                onClick={() => { setMenuOpen(false); handleLogout(); }}
                className="px-5 py-3 bg-red-50 text-red-600 font-bold rounded-xl transition-all duration-300 text-left mt-4 shadow-sm"
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
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone, FaCity } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-primary-900 fixed w-full top-0 z-50 border-b border-primary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent-500 rounded-lg flex items-center justify-center">
              <FaCity className="text-primary-900 text-2xl" />
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-white">Thomas R. Windels</div>
              <div className="text-xs text-primary-300 tracking-wide">Marcus & Millichap</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-primary-200 hover:text-accent-400 transition-colors font-medium">
              Calculator
            </Link>
            <Link to="/contact" className="text-primary-200 hover:text-accent-400 transition-colors font-medium">
              Contact
            </Link>
            <a
              href="tel:+13475632284"
              className="flex items-center gap-2 bg-accent-500 text-primary-900 px-6 py-2.5 rounded-lg hover:bg-accent-400 transition-colors font-semibold"
            >
              <FaPhone className="text-sm" />
              <span>(347) 563-2284</span>
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white hover:text-accent-400 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-6 border-t border-primary-700">
            <div className="flex flex-col space-y-4 pt-6">
              <Link
                to="/"
                className="text-primary-200 hover:text-accent-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Calculator
              </Link>
              <Link
                to="/contact"
                className="text-primary-200 hover:text-accent-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <a
                href="tel:+13475632284"
                className="flex items-center gap-2 bg-accent-500 text-primary-900 px-6 py-2.5 rounded-lg hover:bg-accent-400 transition-colors w-fit font-semibold"
              >
                <FaPhone className="text-sm" />
                <span>(347) 563-2284</span>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

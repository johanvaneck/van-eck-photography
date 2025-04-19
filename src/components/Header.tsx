
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { Icon } from '@/lib/icons/Icon';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="py-6 px-4 md:px-8 lg:px-12 bg-white/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif font-bold text-foreground">
          <div className="flex items-center gap-2">
            <Icon className="w-12 h-12" />
            <div>
              <span className="text-gold">VanEck</span>Photography
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/portfolio" className="nav-link">Portfolio</Link>
          <Link to="/packages" className="nav-link">Packages</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/client-access">
            <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white rounded-full">
              Client Access
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md animate-fade-in py-4">
          <nav className="flex flex-col space-y-4 px-4">
            <Link to="/" className="nav-link py-2" onClick={toggleMenu}>Home</Link>
            <Link to="/portfolio" className="nav-link py-2" onClick={toggleMenu}>Portfolio</Link>
            <Link to="/packages" className="nav-link py-2" onClick={toggleMenu}>Packages</Link>
            <Link to="/contact" className="nav-link py-2" onClick={toggleMenu}>Contact</Link>
            <Link to="/client-access" onClick={toggleMenu}>
              <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white w-full rounded-full">
                Client Access
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

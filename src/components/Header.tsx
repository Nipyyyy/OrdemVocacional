import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';
import logo from '../assets/logo.tsx';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const closeUserMenu = () => setIsUserMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fecha menus quando clica fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      closeUserMenu();
      closeMenu();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark-blue/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <div className="w-10 h-10 text-accent-gold">
              {logo}
            </div>
            <span className="text-xl font-cinzel font-bold tracking-wider text-accent-gold">
              Ordem Vocacional
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`hover:text-accent-gold transition-colors ${location.pathname === '/' ? 'text-accent-gold' : 'text-white'}`}>Início</Link>
            <Link to="/sobre" className={`hover:text-accent-gold transition-colors ${location.pathname === '/sobre' ? 'text-accent-gold' : 'text-white'}`}>Sobre o Teste</Link>
            <Link to="/teste" className={`hover:text-accent-gold transition-colors ${location.pathname === '/teste' ? 'text-accent-gold' : 'text-white'}`}>Fazer Teste</Link>
            <Link to="/rpg" className={`hover:text-accent-gold transition-colors ${location.pathname === '/rpg' ? 'text-accent-gold' : 'text-white'}`}>RPG</Link>
            <Link to="/tokens-e-mapas" className={`hover:text-accent-gold transition-colors ${location.pathname === '/tokens-e-mapas' ? 'text-accent-gold' : 'text-white'}`}>Tokens e Mapas</Link>
            
            {isAuthenticated ? (
              <div className="relative user-menu-container">
                <button 
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 hover:text-accent-gold transition-colors p-2 rounded-md hover:bg-dark-purple/20"
                >
                  <div className="w-8 h-8 rounded-full bg-dark-purple/50 border border-accent-gold/30 flex items-center justify-center overflow-hidden">
                    {user?.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={16} className="text-accent-gold" />
                    )}
                  </div>
                  <span className="text-sm font-medium">{user?.name}</span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-dark-blue/95 backdrop-blur-md border border-light-purple/20 rounded-md shadow-xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-light-purple/20">
                      <p className="text-sm font-medium text-white">{user?.name}</p>
                      <p className="text-xs text-gray-400">{user?.email}</p>
                    </div>
                    
                    <Link 
                      to="/perfil"
                      onClick={closeUserMenu}
                      className="flex items-center w-full px-4 py-2 text-left hover:bg-dark-purple/30 transition-colors text-white"
                    >
                      <Settings size={16} className="mr-3" />
                      Meu Perfil
                    </Link>
                    
                    <Link 
                      to="/resultados"
                      onClick={closeUserMenu}
                      className="flex items-center w-full px-4 py-2 text-left hover:bg-dark-purple/30 transition-colors text-white"
                    >
                      <User size={16} className="mr-3" />
                      Meus Resultados
                    </Link>
                    
                    <div className="border-t border-light-purple/20 mt-2 pt-2">
                      <button 
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-left hover:bg-error/20 transition-colors text-error"
                      >
                        <LogOut size={16} className="mr-3" />
                        Sair
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn-primary text-sm">Entrar</Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-dark-blue/95 backdrop-blur-md border-t border-light-purple/20 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link to="/" className={`py-2 ${location.pathname === '/' ? 'text-accent-gold' : 'text-white'}`} onClick={closeMenu}>Início</Link>
            <Link to="/sobre" className={`py-2 ${location.pathname === '/sobre' ? 'text-accent-gold' : 'text-white'}`} onClick={closeMenu}>Sobre o Teste</Link>
            <Link to="/teste" className={`py-2 ${location.pathname === '/teste' ? 'text-accent-gold' : 'text-white'}`} onClick={closeMenu}>Fazer Teste</Link>
            <Link to="/rpg" className={`py-2 ${location.pathname === '/rpg' ? 'text-accent-gold' : 'text-white'}`} onClick={closeMenu}>RPG</Link>
            <Link to="/tokens-e-mapas" className={`py-2 ${location.pathname === '/tokens-e-mapas' ? 'text-accent-gold' : 'text-white'}`} onClick={closeMenu}>Tokens e Mapas</Link>
            
            {isAuthenticated ? (
              <>
                <div className="border-t border-light-purple/20 pt-4 mt-4">
                  <div className="flex items-center space-x-3 text-white mb-4">
                    <div className="w-10 h-10 rounded-full bg-dark-purple/50 border border-accent-gold/30 flex items-center justify-center overflow-hidden">
                      {user?.photoURL ? (
                        <img 
                          src={user.photoURL} 
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User size={20} className="text-accent-gold" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-xs text-gray-400">{user?.email}</p>
                    </div>
                  </div>
                  
                  <Link 
                    to="/perfil"
                    className="flex items-center text-white hover:text-accent-gold py-2"
                    onClick={closeMenu}
                  >
                    <Settings size={18} className="mr-2" />
                    Meu Perfil
                  </Link>
                  
                  <Link 
                    to="/resultados"
                    className="flex items-center text-white hover:text-accent-gold py-2"
                    onClick={closeMenu}
                  >
                    <User size={18} className="mr-2" />
                    Meus Resultados
                  </Link>
                  
                  <button 
                    onClick={handleLogout}
                    className="flex items-center text-error hover:text-error/80 py-2 mt-2"
                  >
                    <LogOut size={18} className="mr-2" />
                    Sair
                  </button>
                </div>
              </>
            ) : (
              <Link to="/login" className="btn-primary text-center" onClick={closeMenu}>Entrar</Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
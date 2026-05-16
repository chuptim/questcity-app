import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';
import AuthModal from './AuthModal';

const Layout = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-20 glass-card shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition">
            QuestCity
          </Link>
          <div className="flex items-center gap-4 sm:gap-5">
            <Link to="/favorites" className="text-gray-600 hover:text-indigo-600 transition-transform hover:scale-110" title="Избранное">
              <i className="fas fa-heart text-xl"></i>
            </Link>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-md transition-all"
            >
              <i className="fas fa-user mr-1"></i> Войти
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-gray-300">
          <p className="font-semibold tracking-wide">© 2025 QuestCity — превращаем город в игровое поле</p>
          <p className="mt-2 text-xs opacity-70">Геймификация · Экспертные маршруты · Цифровой детокс</p>
        </div>
      </footer>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default Layout;
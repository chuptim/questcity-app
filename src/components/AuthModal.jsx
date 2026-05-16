import { useState } from 'react';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-fade-up" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold text-gray-800">{isLogin ? 'Вход' : 'Регистрация'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><i className="fas fa-times"></i></button>
        </div>

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-full font-medium transition ${isLogin ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-600'}`}
          >Вход</button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-full font-medium transition ${!isLogin ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-600'}`}
          >Регистрация</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="example@mail.ru" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
            <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="••••••••" />
          </div>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Алексей" />
            </div>
          )}
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl transition">
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
          <p className="text-xs text-center text-gray-400 mt-3">
            Это демо-версия, регистрация не сохраняется
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
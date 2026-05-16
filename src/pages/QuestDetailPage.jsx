import { useParams, useNavigate } from 'react-router-dom';
import { quests } from '../data/quests';
import { useFavorites } from '../hooks/useFavorites';
import StarRating from '../components/StarRating';
import FavoriteButton from '../components/FavoriteButton';
import { useState } from 'react';

const QuestDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const quest = quests.find(q => q.id === parseInt(id));
  const { isFavorite, toggleFavorite } = useFavorites();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showStartModal, setShowStartModal] = useState(false);

  if (!quest) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Квест не найден 😕</h2>
        <button onClick={() => navigate('/')} className="mt-4 text-indigo-600 underline hover:no-underline">Вернуться на главную</button>
      </div>
    );
  }

  const handleStart = () => setShowStartModal(true);
  const handleInvite = () => setShowInviteModal(true);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-5xl">
      <button onClick={() => navigate(-1)} className="mb-6 text-indigo-600 hover:text-indigo-800 transition-all flex items-center gap-2 font-medium">
        <i className="fas fa-arrow-left"></i> Назад
      </button>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="relative h-64 sm:h-80 md:h-96">
          <img
            src={quest.image}
            alt={quest.title}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = 'https://placehold.co/1200x600/e2e8f0/475569?text=QuestCity' }}
          />
          <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
            {quest.offlineAvailable && <span className="bg-emerald-100/90 backdrop-blur-sm text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold"><i className="fas fa-mobile-alt mr-1"></i>Офлайн-режим</span>}
            {quest.expert && <span className="bg-purple-100/90 backdrop-blur-sm text-purple-800 px-3 py-1 rounded-full text-sm font-semibold"><i className="fas fa-crown mr-1"></i>Экспертный квест</span>}
            {quest.ugc && <span className="bg-amber-100/90 backdrop-blur-sm text-amber-800 px-3 py-1 rounded-full text-sm font-semibold"><i className="fas fa-users mr-1"></i>UGC-квест</span>}
          </div>
          <div className="absolute bottom-4 right-4">
            <FavoriteButton isFavorite={isFavorite(quest.id)} onToggle={() => toggleFavorite(quest.id)} />
          </div>
        </div>

        <div className="p-5 sm:p-7 md:p-8">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">{quest.title}</h1>
              <div className="flex items-center gap-3 mt-2">
                <StarRating rating={quest.rating} />
                <span className="text-sm text-gray-500">({quest.reviews} отзывов)</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={handleStart} className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold px-5 py-2.5 rounded-full shadow-md transition-all hover:shadow-lg active:scale-95">
                <i className="fas fa-play mr-2"></i>Начать
              </button>
              <button onClick={handleInvite} className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-5 py-2.5 rounded-full shadow-sm transition-all hover:shadow-md active:scale-95">
                <i className="fas fa-user-plus mr-2"></i>Пригласить
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl">
            <div className="flex flex-col items-center text-center">
                <i className="far fa-clock text-indigo-500 text-lg mb-1"></i>
                <span className="font-medium">{quest.duration}</span>
                <span className="text-xs text-gray-500">Длительность</span>
            </div>
            <div className="flex flex-col items-center text-center">
                <i className="fas fa-route text-indigo-500 text-lg mb-1"></i>
                <span className="font-medium">{quest.distance}</span>
                <span className="text-xs text-gray-500">Дистанция</span>
            </div>
            <div className="flex flex-col items-center text-center">
                <i className="fas fa-users text-indigo-500 text-lg mb-1"></i>
                <span className="font-medium">{quest.playersCount.toLocaleString()}</span>
                <span className="text-xs text-gray-500">Участников</span>
            </div>
            <div className="flex flex-col items-center text-center">
                <i className="fas fa-puzzle-piece text-indigo-500 text-lg mb-1"></i>
                <span className="font-medium">{quest.steps}</span>
                <span className="text-xs text-gray-500">Этапов</span>
            </div>
            </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 border-l-4 border-indigo-500 pl-3">О квесте</h2>
            <p className="text-gray-600 mt-3 leading-relaxed">{quest.description}</p>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-gray-700 mb-2">Теги:</h3>
            <div className="flex flex-wrap gap-2">
              {quest.tags.map(tag => (
                <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs hover:bg-indigo-100 transition">#{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showStartModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowStartModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center animate-fade-up" onClick={e => e.stopPropagation()}>
            <i className="fas fa-flag-checkered text-green-500 text-5xl mb-4"></i>
            <h3 className="text-2xl font-bold">Приключение начинается!</h3>
            <p className="text-gray-600 mt-2">Вы запускаете квест <strong>{quest.title}</strong>. В полноценной версии откроется карта с заданиями, таймерами и AR-элементами.</p>
            <button onClick={() => setShowStartModal(false)} className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-indigo-700 transition">Отлично</button>
          </div>
        </div>
      )}

      {showInviteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowInviteModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Пригласить команду</h3>
              <button onClick={() => setShowInviteModal(false)} className="text-gray-400 hover:text-gray-600"><i className="fas fa-times"></i></button>
            </div>
            <p className="text-gray-600">Поделитесь ссылкой, чтобы друзья присоединились к квесту <strong>{quest.title}</strong> и прошли его вместе.</p>
            <div className="mt-4 bg-gray-50 p-3 rounded-xl border border-gray-200 flex items-center justify-between gap-2 flex-wrap">
              <code className="text-xs text-gray-700 break-all">https://questcity.app/join/quest_{quest.id}_team_demo</code>
              <button onClick={() => navigator.clipboard.writeText(`https://questcity.app/join/quest_${quest.id}_team_demo`)} className="bg-white border px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-100">Копировать</button>
            </div>
            <button onClick={() => setShowInviteModal(false)} className="mt-5 w-full bg-gray-100 py-2 rounded-xl font-medium hover:bg-gray-200 transition">Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestDetailPage;
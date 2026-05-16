import { useState } from 'react';
import { quests } from '../data/quests';
import { useFavorites } from '../hooks/useFavorites';
import QuestCard from '../components/QuestCard';

const HomePage = () => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [filter, setFilter] = useState('all');

  const filteredQuests = quests.filter(quest => {
    if (filter === 'all') return true;
    return quest.type === filter;
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent animate-fade-up">
          Выбери приключение
        </h1>
        <p className="text-gray-600 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
          Квесты, созданные экспертами и пользователями, чтобы исследовать город по-новому. 
          Играй, открывай тайны, делись эмоциями!
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">
        {[
          { id: 'all', label: 'Все квесты', icon: 'fa-globe' },
          { id: 'active', label: 'Активные', icon: 'fa-fire' },
          { id: 'explorer', label: 'Исследователи', icon: 'fa-compass' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setFilter(item.id)}
            className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm ${
              filter === item.id
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md scale-105'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:shadow'
            }`}
          >
            <i className={`fas ${item.icon} text-sm`}></i>
            <span className="text-sm sm:text-base">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredQuests.map(quest => (
          <QuestCard
            key={quest.id}
            quest={quest}
            isFavorite={isFavorite(quest.id)}
            onToggleFavorite={() => toggleFavorite(quest.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
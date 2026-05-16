// src/pages/HomePage.jsx
import { useState, useEffect } from 'react';
import { quests } from '../data/quests';
import { useFavorites } from '../hooks/useFavorites';
import QuestCard from '../components/QuestCard';
import MoodModal from '../components/MoodModal';

const HomePage = () => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [filter, setFilter] = useState('all');
  const [moodAnswers, setMoodAnswers] = useState(null);
  const [showMoodModal, setShowMoodModal] = useState(false);

  // Загружаем сохранённые ответы при монтировании
  useEffect(() => {
    const saved = localStorage.getItem('questcity_mood_answers');
    if (saved) {
      setMoodAnswers(JSON.parse(saved));
    }
  }, []);

  const handleMoodComplete = (answers) => {
    setMoodAnswers(answers);
    localStorage.setItem('questcity_mood_answers', JSON.stringify(answers));
    // После прохождения теста можно оставить фильтр "под настроение" активным
    setFilter('mood');
  };

  const resetMood = () => {
    localStorage.removeItem('questcity_mood_answers');
    setMoodAnswers(null);
    setFilter('all'); // возвращаемся к "Все квесты"
  };

  // Функция фильтрации по настроению
  const getFilteredByMood = (list) => {
    if (!moodAnswers) return list;
    let filtered = [...list];
    // Энергия
    if (moodAnswers.energy === 'high') {
      filtered = filtered.filter(q => q.duration.includes('2') || q.duration.includes('1.5') || q.type === 'active');
    } else if (moodAnswers.energy === 'low') {
      filtered = filtered.filter(q => q.duration.includes('3') || q.duration.includes('4') || q.type === 'explorer');
    }
    // Компания
    if (moodAnswers.company === 'solo') {
      filtered = filtered.filter(q => q.offlineAvailable === true || q.tags.includes('детокс'));
    } else if (moodAnswers.company === 'friends') {
      filtered = filtered.filter(q => q.playersCount > 1000);
    }
    // Интерес
    if (moodAnswers.interest === 'adventure') {
      filtered = filtered.filter(q => q.tags.includes('мистика') || q.tags.includes('активный'));
    } else if (moodAnswers.interest === 'culture') {
      filtered = filtered.filter(q => q.tags.includes('история') || q.tags.includes('архитектура'));
    } else if (moodAnswers.interest === 'food') {
      filtered = filtered.filter(q => q.category === 'food');
    } else if (moodAnswers.interest === 'art') {
      filtered = filtered.filter(q => q.category === 'art' || q.tags.includes('искусство'));
    }
    return filtered;
  };

  let displayedQuests = quests;
  if (filter === 'active') {
    displayedQuests = quests.filter(q => q.type === 'active');
  } else if (filter === 'explorer') {
    displayedQuests = quests.filter(q => q.type === 'explorer');
  } else if (filter === 'mood' && moodAnswers) {
    displayedQuests = getFilteredByMood(quests);
  } else {
    displayedQuests = quests; // 'all' или нет фильтра
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent animate-fade-up">
          Выбери приключение
        </h1>
        <p className="text-gray-600 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
          Квесты, созданные экспертами и пользователями, чтобы исследовать город по-новому. Играй, открывай тайны, делись эмоциями!
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">
        {[
          { id: 'all', label: 'Все квесты', icon: 'fa-globe' },
          { id: 'active', label: 'Активные', icon: 'fa-fire' },
          { id: 'explorer', label: 'Исследователи', icon: 'fa-compass' },
          { id: 'mood', label: 'Под настроение', icon: 'fa-smile' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (item.id === 'mood') {
                if (moodAnswers) {
                  setFilter('mood');
                } else {
                  setShowMoodModal(true);
                }
              } else {
                setFilter(item.id);
              }
            }}
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

      {filter === 'mood' && moodAnswers && (
        <div className="text-center mb-6">
          <button onClick={resetMood} className="text-sm text-indigo-600 underline hover:no-underline">
            🔄 Пройти тест заново
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {displayedQuests.map(quest => (
          <QuestCard
            key={quest.id}
            quest={quest}
            isFavorite={isFavorite(quest.id)}
            onToggleFavorite={() => toggleFavorite(quest.id)}
          />
        ))}
      </div>

      {displayedQuests.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">😕 По вашему настроению нет подходящих квестов. Попробуйте пройти тест заново или выберите другой раздел.</p>
        </div>
      )}

      <MoodModal
        isOpen={showMoodModal}
        onClose={() => setShowMoodModal(false)}
        onComplete={handleMoodComplete}
      />
    </div>
  );
};

export default HomePage;
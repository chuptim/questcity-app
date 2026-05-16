import { quests } from '../data/quests';
import { useFavorites } from '../hooks/useFavorites';
import QuestCard from '../components/QuestCard';

const FavoritesPage = () => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const favoriteQuests = quests.filter(quest => favorites.includes(quest.id));

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          Избранное
        </h1>
        <p className="text-gray-600 mt-3">Квесты, которые вы отметили сердечком</p>
      </div>

      {favoriteQuests.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
          <i className="far fa-heart text-gray-300 text-5xl mb-3"></i>
          <p className="text-gray-500">У вас пока нет избранных квестов</p>
          <p className="text-sm text-gray-400 mt-1">Нажмите ❤️ на карточке квеста, чтобы добавить его сюда</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {favoriteQuests.map(quest => (
            <QuestCard
              key={quest.id}
              quest={quest}
              isFavorite={isFavorite(quest.id)}
              onToggleFavorite={() => toggleFavorite(quest.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
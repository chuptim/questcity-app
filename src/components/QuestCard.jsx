import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';
import FavoriteButton from './FavoriteButton';

const QuestCard = ({ quest, isFavorite, onToggleFavorite }) => {
  const navigate = useNavigate();

  const handleClick = () => navigate(`/quest/${quest.id}`);

  return (
    <div
      className="group bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full animate-fade-up"
      onClick={handleClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={quest.image}
          alt={quest.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => { e.target.src = 'https://placehold.co/600x400/e2e8f0/475569?text=QuestCity' }}
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {quest.offlineAvailable && (
            <span className="bg-emerald-100/90 backdrop-blur-sm text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
              <i className="fas fa-mobile-alt mr-1"></i>Офлайн
            </span>
          )}
          {quest.expert && (
            <span className="bg-purple-100/90 backdrop-blur-sm text-purple-800 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
              <i className="fas fa-crown mr-1"></i>Эксперт
            </span>
          )}
          {quest.ugc && (
            <span className="bg-amber-100/90 backdrop-blur-sm text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
              <i className="fas fa-users mr-1"></i>UGC
            </span>
          )}
        </div>
        <div className="absolute bottom-3 right-3">
          <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} />
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight line-clamp-2">{quest.title}</h3>
          <StarRating rating={quest.rating} />
        </div>
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">{quest.shortDesc}</p>
        <div className="flex flex-wrap gap-3 mt-4 text-xs text-gray-500">
          <span className="flex items-center"><i className="far fa-clock mr-1 text-indigo-500"></i> {quest.duration}</span>
          <span className="flex items-center"><i className="fas fa-route mr-1 text-indigo-500"></i> {quest.distance}</span>
          <span className="flex items-center"><i className="fas fa-user-friends mr-1 text-indigo-500"></i> {quest.playersCount.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default QuestCard;
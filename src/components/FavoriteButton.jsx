const FavoriteButton = ({ isFavorite, onToggle }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onToggle();
  };

  return (
    <button
      onClick={handleClick}
      className="p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:scale-110 transition-all duration-200 hover:shadow-xl active:scale-95"
      aria-label={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
    >
      <i className={`fas fa-heart text-base sm:text-lg ${isFavorite ? 'text-red-500 animate-pulse-slow' : 'text-gray-400'}`}></i>
    </button>
  );
};

export default FavoriteButton;
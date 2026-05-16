const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <i
          key={i}
          className={`fas fa-star text-xs sm:text-sm transition-all ${
            i < fullStars
              ? 'text-yellow-400 drop-shadow-sm'
              : i === fullStars && hasHalf
              ? 'fa-star-half-alt text-yellow-400'
              : 'text-gray-300'
          }`}
        ></i>
      ))}
      <span className="ml-1 text-xs text-gray-600 font-medium">{rating.toFixed(1)}</span>
    </div>
  );
};

export default StarRating;
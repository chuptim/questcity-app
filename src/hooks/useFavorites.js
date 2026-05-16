import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'questcity_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const addFavorite = (id) => {
    if (!favorites.includes(id)) {
      const newFavs = [...favorites, id];
      setFavorites(newFavs);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavs));
    }
  };

  const removeFavorite = (id) => {
    const newFavs = favorites.filter(favId => favId !== id);
    setFavorites(newFavs);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavs));
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  const isFavorite = (id) => favorites.includes(id);

  return { favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite };
}
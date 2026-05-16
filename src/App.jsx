import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import QuestDetailPage from './pages/QuestDetailPage';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="quest/:id" element={<QuestDetailPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
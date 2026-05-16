// src/components/MoodModal.jsx
import { useState } from 'react';

const questions = [
  {
    id: 'energy',
    text: 'Какой у тебя уровень энергии?',
    options: [
      { value: 'high', label: '🔥 Высокий — хочу активностей', icon: 'fa-bolt' },
      { value: 'medium', label: '😌 Средний — готов гулять, но без фанатизма', icon: 'fa-sun' },
      { value: 'low', label: '🛋️ Низкий — хочу спокойно наблюдать', icon: 'fa-cloud-moon' }
    ]
  },
  {
    id: 'company',
    text: 'С кем планируешь квест?',
    options: [
      { value: 'friends', label: '👥 С друзьями', icon: 'fa-users' },
      { value: 'couple', label: '💑 На двоих', icon: 'fa-heart' },
      { value: 'solo', label: '🧘 Один', icon: 'fa-user' }
    ]
  },
  {
    id: 'interest',
    text: 'Что тебя сейчас привлекает?',
    options: [
      { value: 'adventure', label: '🗺️ Приключения', icon: 'fa-map' },
      { value: 'culture', label: '🏛️ История', icon: 'fa-landmark' },
      { value: 'food', label: '🍜 Еда', icon: 'fa-utensils' },
      { value: 'art', label: '🎨 Искусство', icon: 'fa-palette' }
    ]
  }
];

const MoodModal = ({ isOpen, onClose, onComplete }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  if (!isOpen) return null;

  const handleAnswer = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      onComplete(newAnswers);
      onClose();
      setStep(0);
      setAnswers({});
    }
  };

  const current = questions[step];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold text-center mb-4">🎯 Настроение</h2>
        <p className="font-semibold mb-3">{current.text}</p>
        <div className="space-y-2">
          {current.options.map(opt => (
            <button
              key={opt.value}
              onClick={() => handleAnswer(current.id, opt.value)}
              className="w-full text-left px-4 py-2 rounded-xl border hover:border-indigo-400 hover:bg-indigo-50 transition flex items-center gap-2"
            >
              <i className={`fas ${opt.icon} text-indigo-500 w-5`}></i>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
        <div className="text-center text-xs text-gray-400 mt-4">
          Шаг {step+1} из {questions.length}
        </div>
      </div>
    </div>
  );
};

export default MoodModal;
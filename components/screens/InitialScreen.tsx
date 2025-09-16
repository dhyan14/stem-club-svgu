
import React, { useState } from 'react';
import { useQuiz } from '../../context/QuizContext';
import Card from '../ui/Card';
import Button from '../ui/Button';

const InitialScreen: React.FC = () => {
  const [localTeamNumber, setLocalTeamNumber] = useState('');
  const { startQuiz } = useQuiz();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localTeamNumber.trim()) {
      startQuiz(localTeamNumber.trim());
    }
  };

  return (
    <Card className="text-center animate-fade-in-up">
      <h2 className="text-3xl font-bold mb-4 text-white">Welcome to the Quiz!</h2>
      <p className="text-gray-400 mb-8">Please enter your team number to begin.</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <input
          type="text"
          value={localTeamNumber}
          onChange={(e) => setLocalTeamNumber(e.target.value)}
          placeholder="e.g., Team 07"
          className="w-full sm:w-auto flex-grow bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          required
        />
        <Button type="submit" disabled={!localTeamNumber.trim()}>
          Start Quiz
        </Button>
      </form>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
      `}</style>
    </Card>
  );
};

export default InitialScreen;
   
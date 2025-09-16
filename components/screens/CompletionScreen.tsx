
import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useQuiz } from '../../context/QuizContext';

const CompletionScreen: React.FC = () => {
  const { teamNumber, resetQuiz } = useQuiz();
  return (
    <Card className="text-center animate-fade-in-up">
      <h2 className="text-3xl font-bold mb-4 text-green-400">Congratulations, Team {teamNumber}!</h2>
      <p className="text-gray-300 mb-8 text-lg">You have successfully completed all rounds of the quiz. Your submissions have been recorded.</p>
      <p className="text-gray-400">Thank you for your participation!</p>
      <Button onClick={resetQuiz} className="mt-8">
        Start Over
      </Button>
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

export default CompletionScreen;
   
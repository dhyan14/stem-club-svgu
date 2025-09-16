import React, { useState, useMemo } from 'react';
import { useQuiz } from '../../context/QuizContext';
import { ROUND_1_QUESTIONS } from '../../constants';
import { Round } from '../../types';
import { submitRound1 } from '../../services/googleSheetsService';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Spinner from '../ui/Spinner';

const Round1: React.FC = () => {
  const { teamNumber, round1Answers, setRound1Answers, advanceToRound } = useQuiz();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAnswerChange = (questionId: number, answer: string) => {
    setRound1Answers(prev => ({ ...prev, [questionId]: answer }));
  };
  
  const allAnswered = useMemo(() => {
    return ROUND_1_QUESTIONS.length === Object.keys(round1Answers).length;
  }, [round1Answers]);

  const handleSubmit = async () => {
    if (!allAnswered) return;
    setIsSubmitting(true);
    setError(null);
    try {
      await submitRound1(teamNumber, round1Answers);
      advanceToRound(Round.TWO);
    } catch (err) {
      console.error("Round 1 Submission Error:", err);
      setError('Failed to submit answers. Please try again.');
    } finally {
      setIsSubmitting(false);
      setIsModalOpen(false);
    }
  };

  return (
    <Card>
      <h2 className="text-3xl font-bold text-center mb-6 text-cyan-400">Round 1: Multiple Choice</h2>
      <div className="space-y-8">
        {ROUND_1_QUESTIONS.map((q, index) => (
          <div key={q.id} className="border-b border-gray-700 pb-6">
            <p className="text-lg font-semibold mb-4 text-gray-200">Question {index + 1}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.keys(q.options).map((key) => (
                <label
                  key={key}
                  className={`flex items-center justify-center p-4 rounded-lg cursor-pointer transition-colors duration-200 text-2xl ${
                    round1Answers[q.id] === key
                      ? 'bg-cyan-600 border-cyan-400'
                      : 'bg-gray-700 hover:bg-gray-600 border-gray-600'
                  } border-2`}
                >
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={key}
                    checked={round1Answers[q.id] === key}
                    onChange={() => handleAnswerChange(q.id, key)}
                    className="hidden"
                  />
                  <span className="font-bold text-cyan-300">{key}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button onClick={() => setIsModalOpen(true)} disabled={!allAnswered || isSubmitting}>
          Submit Round 1
        </Button>
        {!allAnswered && <p className="text-sm text-yellow-400 mt-2">Please answer all questions before submitting.</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Confirm Submission">
        <p className="text-gray-300 mb-6">Are you sure you want to submit your answers for Round 1? This action cannot be undone.</p>
        <div className="max-h-60 overflow-y-auto bg-gray-900 p-4 rounded-md mb-6 border border-gray-700">
            <h3 className="font-bold text-lg mb-2 text-gray-200">Your Answers:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
                {ROUND_1_QUESTIONS.map(q => (
                    <li key={q.id}>
                        Q{q.id}: <span className="font-semibold text-cyan-300">{round1Answers[q.id]}</span>
                    </li>
                ))}
            </ul>
        </div>
        <div className="flex justify-end gap-4">
          <Button variant="secondary" onClick={() => setIsModalOpen(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting} className="flex items-center gap-2">
            {isSubmitting && <Spinner size="sm" />}
            Confirm & Submit
          </Button>
        </div>
      </Modal>
    </Card>
  );
};

export default Round1;
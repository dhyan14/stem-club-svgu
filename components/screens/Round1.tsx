import React, { useState } from 'react';
import { useQuiz } from '../../context/QuizContext';
import { ROUND_1_QUESTIONS } from '../../constants';
import { Round } from '../../types';
import { submitRound1 } from '../../services/googleSheetsService';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import Modal from '../ui/Modal';

const Round1: React.FC = () => {
  const { teamNumber, round1Answers, setRound1Answers, advanceToRound } = useQuiz();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSkipModalOpen, setIsSkipModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const currentQuestion = ROUND_1_QUESTIONS[currentQuestionIndex];
  const qId = currentQuestion.id;
  const selectedAnswer = round1Answers[qId] || '';

  const handleAnswerChange = (questionId: number, answer: string) => {
    setRound1Answers(prev => ({
      ...prev,
      [questionId]: answer,
    }));
  };
  
  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setSubmissionError(null);
    try {
      await submitRound1(teamNumber, round1Answers);
      setIsModalOpen(false);
      advanceToRound(Round.TWO);
    } catch (err) {
      console.error("Round 1 Submission Error:", err);
      setSubmissionError("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigateNext = () => {
    if (currentQuestionIndex >= ROUND_1_QUESTIONS.length - 1) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnimating(false);
    }, 150);
  };

  const handleSkipConfirm = () => {
    navigateNext();
    setIsSkipModalOpen(false);
  };

  return (
    <Card>
      <h2 className="text-3xl font-bold text-center mb-2 text-cyan-400">Round 1: Multiple Choice</h2>
      <p className="text-center text-gray-400 mb-6">Question {currentQuestionIndex + 1} of {ROUND_1_QUESTIONS.length}</p>
      
      <div className={`transition-opacity duration-150 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <div key={qId} className="border-t border-b border-gray-700 py-6">
          <div className="flex justify-center items-center gap-4 my-8 min-h-[80px]">
            {Object.keys(currentQuestion.options).map((key) => (
              <label
                key={key}
                className={`flex items-center justify-center w-20 h-20 rounded-lg border-2 text-4xl font-bold transition-colors duration-200 cursor-pointer hover:bg-gray-600 ${
                  selectedAnswer === key
                    ? 'bg-cyan-600 border-cyan-400 text-white'
                    : 'bg-gray-700 border-gray-600 text-cyan-300'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${qId}`}
                  value={key}
                  checked={selectedAnswer === key}
                  onChange={() => handleAnswerChange(qId, key)}
                  className="hidden"
                  aria-label={`Option ${key}`}
                />
                {key}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end items-center min-h-[56px] gap-4">
        {currentQuestionIndex < ROUND_1_QUESTIONS.length - 1 ? (
          <>
            <Button onClick={() => setIsSkipModalOpen(true)} variant="secondary" disabled={isAnimating}>
              Skip
            </Button>
            <Button onClick={navigateNext} disabled={isAnimating}>
              Next
            </Button>
          </>
        ) : (
            <Button onClick={() => setIsModalOpen(true)} disabled={isAnimating}>
                Submit Round 1
            </Button>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Confirm Submission">
        <p className="text-gray-300 mb-6">Are you sure you want to submit your answers for Round 1? You will not be able to change them later.</p>
        {submissionError && <p className="text-red-500 mb-4">{submissionError}</p>}
        <div className="flex justify-end gap-4">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)} disabled={isSubmitting}>Cancel</Button>
            <Button onClick={handleFinalSubmit} disabled={isSubmitting} className="flex items-center gap-2">
                {isSubmitting ? <Spinner size="sm" /> : 'Confirm & Submit'}
            </Button>
        </div>
      </Modal>

      <Modal isOpen={isSkipModalOpen} onClose={() => setIsSkipModalOpen(false)} title="Confirm Skip">
        <p className="text-gray-300 mb-6">Are you sure you want to skip this question? You will not be able to return to it.</p>
        <div className="flex justify-end gap-4">
            <Button variant="secondary" onClick={() => setIsSkipModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSkipConfirm}>
                Confirm & Skip
            </Button>
        </div>
      </Modal>
    </Card>
  );
};

export default Round1;
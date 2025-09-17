import React, { useState } from 'react';
import { useQuiz } from '../../context/QuizContext';
import { ROUND_2_QUESTIONS } from '../../constants';
import { Round } from '../../types';
import { submitRound2 } from '../../services/googleSheetsService';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import Modal from '../ui/Modal';

const Round2: React.FC = () => {
  const { teamNumber, round2Answers, setRound2Answers, advanceToRound } = useQuiz();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSkipModalOpen, setIsSkipModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const currentQuestion = ROUND_2_QUESTIONS[currentQuestionIndex];
  const qId = currentQuestion.id;
  const selectedAnswers = round2Answers[qId] || [];
  const isLastQuestion = currentQuestionIndex >= ROUND_2_QUESTIONS.length - 1;

  const handleAnswerChange = (questionId: number, option: string) => {
    setRound2Answers(prev => {
      const currentAnswers = prev[questionId] || [];
      const newAnswers = currentAnswers.includes(option)
        ? currentAnswers.filter(a => a !== option)
        : [...currentAnswers, option];
      return { ...prev, [questionId]: newAnswers };
    });
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setSubmissionError(null);
    try {
      await submitRound2(teamNumber, round2Answers);
      setIsModalOpen(false);
      advanceToRound(Round.THREE);
    } catch (err) {
      console.error("Round 2 Submission Error:", err);
      setSubmissionError("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigateNext = () => {
    if (isLastQuestion) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnimating(false);
    }, 150);
  };

  const handleSkipConfirm = () => {
    setIsSkipModalOpen(false);
    if (isLastQuestion) {
        setTimeout(() => setIsModalOpen(true), 150);
    } else {
        navigateNext();
    }
  };

  const skipModalText = isLastQuestion
    ? "Are you sure you want to skip this question? This will proceed to the final submission for this round."
    : "Are you sure you want to skip this question? You will not be able to return to it.";


  return (
    <Card>
      <h2 className="text-3xl font-bold text-center mb-2 text-cyan-400">Round 2: Multi-Select</h2>
      <p className="text-center text-gray-400 mb-6">Question {currentQuestionIndex + 1} of {ROUND_2_QUESTIONS.length}</p>

      <div className={`transition-opacity duration-150 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <div key={qId} className="border-t border-b border-gray-700 py-6">
          <p className="mb-4 text-center text-lg text-gray-200 font-medium">{currentQuestion.question}</p>
           <div className="flex justify-center items-center gap-4 my-8 min-h-[80px]">
            {Object.keys(currentQuestion.options).map((key) => (
              <label
                key={key}
                className={`flex items-center justify-center w-20 h-20 rounded-lg border-2 text-4xl font-bold transition-colors duration-200 cursor-pointer hover:bg-gray-600 ${
                  selectedAnswers.includes(key)
                    ? 'bg-cyan-600 border-cyan-400 text-white'
                    : 'bg-gray-700 border-gray-600 text-cyan-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedAnswers.includes(key)}
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
        {isLastQuestion ? (
          <>
            <Button onClick={() => setIsSkipModalOpen(true)} variant="secondary" disabled={isAnimating}>
                Skip
            </Button>
            <Button onClick={() => setIsModalOpen(true)} disabled={isAnimating}>
                Submit Round 2
            </Button>
          </>
        ) : (
            <>
              <Button onClick={() => setIsSkipModalOpen(true)} variant="secondary" disabled={isAnimating}>
                Skip
              </Button>
              <Button onClick={navigateNext} disabled={isAnimating || selectedAnswers.length === 0}>
                  Next
              </Button>
            </>
        )}
      </div>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Confirm Submission">
        <p className="text-gray-300 mb-6">Are you sure you want to submit your answers for Round 2? You will not be able to change them later.</p>
        {submissionError && <p className="text-red-500 mb-4">{submissionError}</p>}
        <div className="flex justify-end gap-4">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)} disabled={isSubmitting}>Cancel</Button>
            <Button onClick={handleFinalSubmit} disabled={isSubmitting} className="flex items-center gap-2">
                {isSubmitting ? <Spinner size="sm" /> : 'Confirm & Submit'}
            </Button>
        </div>
      </Modal>

      <Modal isOpen={isSkipModalOpen} onClose={() => setIsSkipModalOpen(false)} title="Confirm Skip">
        <p className="text-gray-300 mb-6">{skipModalText}</p>
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

export default Round2;
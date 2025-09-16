import React, { useState } from 'react';
import { useQuiz } from '../../context/QuizContext';
import { ROUND_3_QUESTIONS } from '../../constants';
import { Round } from '../../types';
import { submitRound3Answer } from '../../services/googleSheetsService';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import Modal from '../ui/Modal';

interface QuestionState {
  isSubmitting: boolean;
  error: string | null;
}

const Round3: React.FC = () => {
  const { teamNumber, round3Answers, setRound3Answers, advanceToRound } = useQuiz();
  const [submissionStates, setSubmissionStates] = useState<{ [key: number]: QuestionState }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSkipModalOpen, setIsSkipModalOpen] = useState(false);

  const currentQuestion = ROUND_3_QUESTIONS[currentQuestionIndex];
  const qId = currentQuestion.id;
  const answerData = round3Answers[qId] || { answer: '', submitted: false };
  const state = submissionStates[qId] || { isSubmitting: false, error: null };
  
  const handleAnswerChange = (questionId: number, answer: string) => {
    setRound3Answers(prev => ({
      ...prev,
      [questionId]: { ...(prev[questionId] || { submitted: false }), answer },
    }));
  };

  const handleSubmitAnswer = async (questionId: number) => {
    const currentAnswerData = round3Answers[questionId];
    if (!currentAnswerData || !currentAnswerData.answer?.trim()) return;

    setSubmissionStates(prev => ({ ...prev, [questionId]: { isSubmitting: true, error: null } }));
    
    try {
      await submitRound3Answer(teamNumber, questionId, currentAnswerData.answer);
      setRound3Answers(prev => ({
        ...prev,
        [questionId]: { ...prev[questionId], submitted: true },
      }));
       setSubmissionStates(prev => ({ ...prev, [questionId]: { isSubmitting: false, error: null } }));
    } catch (err) {
      console.error(`Round 3 (Q${questionId}) Submission Error:`, err);
      setSubmissionStates(prev => ({ ...prev, [questionId]: { isSubmitting: false, error: 'Submission failed. Please try again.' } }));
    }
  };

  const navigateToNext = () => {
    if (currentQuestionIndex < ROUND_3_QUESTIONS.length - 1) {
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentQuestionIndex(prev => prev + 1);
            setIsAnimating(false);
        }, 150);
    } else {
        advanceToRound(Round.COMPLETED);
    }
  };

  const handleSkipConfirm = () => {
    navigateToNext();
    setIsSkipModalOpen(false);
  };

  return (
    <Card>
      <h2 className="text-3xl font-bold text-center mb-2 text-cyan-400">Round 3: Open-Ended</h2>
      <p className="text-center text-gray-400 mb-6">Question {currentQuestionIndex + 1} of {ROUND_3_QUESTIONS.length}</p>

      <div className={`transition-opacity duration-150 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <div key={qId} className="border-t border-b border-gray-700 py-6">
            <textarea
              value={answerData.answer}
              onChange={(e) => handleAnswerChange(qId, e.target.value)}
              readOnly={answerData.submitted}
              placeholder="Type your answer here..."
              className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none min-h-[120px] disabled:bg-gray-800 disabled:text-gray-400"
              disabled={answerData.submitted}
            />
            <div className="mt-3 flex items-center justify-end gap-3 h-10">
              {state.error && <p className="text-red-500 text-sm mr-auto">{state.error}</p>}
              {answerData.submitted ? (
                  <div className="text-green-400 font-bold flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    Submitted
                  </div>
              ) : (
                <>
                  <Button 
                      onClick={() => setIsSkipModalOpen(true)} 
                      disabled={state.isSubmitting || isAnimating}
                      variant="secondary"
                      className="px-4 py-2 text-sm"
                  >
                      Skip
                  </Button>
                  <Button 
                      onClick={() => handleSubmitAnswer(qId)} 
                      disabled={!answerData.answer?.trim() || state.isSubmitting} 
                      className="flex items-center gap-2 px-4 py-2 text-sm"
                  >
                    {state.isSubmitting ? <Spinner size="sm" /> : 'Submit Answer'}
                  </Button>
                </>
              )}
            </div>
        </div>
      </div>

      <div className="mt-8 text-center min-h-[56px]">
        {answerData.submitted && (
            <Button onClick={navigateToNext} disabled={isAnimating}>
                {currentQuestionIndex < ROUND_3_QUESTIONS.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </Button>
        )}
      </div>

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

export default Round3;
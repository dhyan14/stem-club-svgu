import React, { useState, useMemo, useCallback } from 'react';
import { useQuiz } from '../../context/QuizContext';
import { ROUND_3_QUESTIONS } from '../../constants';
import { Round } from '../../types';
import { submitRound3Answer } from '../../services/googleSheetsService';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';

interface QuestionState {
  isSubmitting: boolean;
  error: string | null;
}

const Round3: React.FC = () => {
  const { teamNumber, round3Answers, setRound3Answers, advanceToRound } = useQuiz();
  const [submissionStates, setSubmissionStates] = useState<{ [key: number]: QuestionState }>({});
  
  const handleAnswerChange = (questionId: number, answer: string) => {
    setRound3Answers(prev => ({
      ...prev,
      [questionId]: { ...(prev[questionId] || { submitted: false }), answer },
    }));
  };

  const handleSubmitAnswer = async (questionId: number) => {
    const answerData = round3Answers[questionId];
    if (!answerData || !answerData.answer?.trim()) return;

    setSubmissionStates(prev => ({ ...prev, [questionId]: { isSubmitting: true, error: null } }));
    
    try {
      await submitRound3Answer(teamNumber, questionId, answerData.answer);
      setRound3Answers(prev => ({
        ...prev,
        [questionId]: { ...prev[questionId], submitted: true },
      }));
    } catch (err) {
      console.error(`Round 3 (Q${questionId}) Submission Error:`, err);
      setSubmissionStates(prev => ({ ...prev, [questionId]: { isSubmitting: false, error: 'Submission failed.' } }));
    } finally {
        // We keep the submitting state as true on success to show completion
        const isSuccess = !submissionStates[questionId]?.error;
        if(isSuccess) {
            setSubmissionStates(prev => ({ ...prev, [questionId]: { isSubmitting: false, error: null } }));
        }
    }
  };

  const allSubmitted = useMemo(() => {
    return ROUND_3_QUESTIONS.every(q => round3Answers[q.id]?.submitted);
  }, [round3Answers]);
  
  const QuestionItem = useCallback(({ questionData } : {questionData: typeof ROUND_3_QUESTIONS[0]}) => {
    const qId = questionData.id;
    const answerData = round3Answers[qId] || { answer: '', submitted: false };
    const state = submissionStates[qId] || { isSubmitting: false, error: null };
    
    return (
        <div className="border-b border-gray-700 pb-6">
            <p className="text-lg font-semibold mb-4 text-gray-200">Question {qId}</p>
            <textarea
              value={answerData.answer}
              onChange={(e) => handleAnswerChange(qId, e.target.value)}
              readOnly={answerData.submitted}
              placeholder="Type your answer here..."
              className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none min-h-[100px] disabled:bg-gray-800 disabled:text-gray-400"
              disabled={answerData.submitted}
            />
            <div className="mt-3 flex items-center justify-end gap-3">
              {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
              {answerData.submitted ? (
                  <div className="text-green-400 font-bold flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    Submitted
                  </div>
              ) : (
                <Button 
                    onClick={() => handleSubmitAnswer(qId)} 
                    disabled={!answerData.answer?.trim() || state.isSubmitting} 
                    className="flex items-center gap-2 px-4 py-2 text-sm"
                >
                  {state.isSubmitting ? <Spinner size="sm" /> : 'Submit Answer'}
                </Button>
              )}
            </div>
        </div>
    )
  }, [round3Answers, submissionStates]);

  return (
    <Card>
      <h2 className="text-3xl font-bold text-center mb-6 text-cyan-400">Round 3: Open-Ended</h2>
      <p className="text-center text-gray-400 mb-8">Submit each answer individually. Your response is saved as soon as you hit 'Submit Answer'.</p>
      <div className="space-y-8">
        {ROUND_3_QUESTIONS.map(q => (
          <QuestionItem key={q.id} questionData={q}/>
        ))}
      </div>
      <div className="mt-8 text-center">
        {allSubmitted ? (
          <Button onClick={() => advanceToRound(Round.COMPLETED)}>
            Finish Quiz
          </Button>
        ) : (
          <p className="text-yellow-400">Please submit answers for all questions to finish the quiz.</p>
        )}
      </div>
    </Card>
  );
};

export default Round3;

import React, { createContext, useContext } from 'react';
import { Round, Round1Answers, Round2Answers, Round3Answers } from '../types';

interface QuizContextType {
  teamNumber: string;
  currentRound: Round;
  round1Answers: Round1Answers;
  round2Answers: Round2Answers;
  round3Answers: Round3Answers;
  startQuiz: (teamNumber: string) => void;
  advanceToRound: (round: Round) => void;
  setRound1Answers: (answers: Round1Answers | ((prev: Round1Answers) => Round1Answers)) => void;
  setRound2Answers: (answers: Round2Answers | ((prev: Round2Answers) => Round2Answers)) => void;
  setRound3Answers: (answers: Round3Answers | ((prev: Round3Answers) => Round3Answers)) => void;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = QuizContext.Provider;

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
   
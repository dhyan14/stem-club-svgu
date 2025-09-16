
import React, { useState, useCallback, useMemo } from 'react';
import { QuizProvider } from './context/QuizContext';
import InitialScreen from './components/screens/InitialScreen';
import Round1 from './components/screens/Round1';
import Round2 from './components/screens/Round2';
import Round3 from './components/screens/Round3';
import CompletionScreen from './components/screens/CompletionScreen';
import useLocalStorage from './hooks/useLocalStorage';
import { Round, Round1Answers, Round2Answers, Round3Answers } from './types';

function App() {
  const [teamNumber, setTeamNumber] = useLocalStorage<string>('teamNumber', '');
  const [currentRound, setCurrentRound] = useLocalStorage<Round>('currentRound', Round.INITIAL);
  const [round1Answers, setRound1Answers] = useLocalStorage<Round1Answers>('round1Answers', {});
  const [round2Answers, setRound2Answers] = useLocalStorage<Round2Answers>('round2Answers', {});
  const [round3Answers, setRound3Answers] = useLocalStorage<Round3Answers>('round3Answers', {});
  
  const startQuiz = useCallback((newTeamNumber: string) => {
    setTeamNumber(newTeamNumber);
    setCurrentRound(Round.ONE);
  }, [setTeamNumber, setCurrentRound]);
  
  const advanceToRound = useCallback((round: Round) => {
    setCurrentRound(round);
  }, [setCurrentRound]);

  const resetQuiz = useCallback(() => {
    setTeamNumber('');
    setCurrentRound(Round.INITIAL);
    setRound1Answers({});
    setRound2Answers({});
    setRound3Answers({});
  }, [setTeamNumber, setCurrentRound, setRound1Answers, setRound2Answers, setRound3Answers]);
  
  const contextValue = useMemo(() => ({
    teamNumber,
    currentRound,
    round1Answers,
    round2Answers,
    round3Answers,
    startQuiz,
    advanceToRound,
    setRound1Answers,
    setRound2Answers,
    setRound3Answers,
    resetQuiz
  }), [teamNumber, currentRound, round1Answers, round2Answers, round3Answers, startQuiz, advanceToRound, setRound1Answers, setRound2Answers, setRound3Answers, resetQuiz]);
  
  const renderCurrentRound = () => {
    switch (currentRound) {
      case Round.INITIAL:
        return <InitialScreen />;
      case Round.ONE:
        return <Round1 />;
      case Round.TWO:
        return <Round2 />;
      case Round.THREE:
        return <Round3 />;
      case Round.COMPLETED:
        return <CompletionScreen />;
      default:
        return <InitialScreen />;
    }
  };

  return (
    <QuizProvider value={contextValue}>
      <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4 font-sans">
        <div className="w-full max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 tracking-wider">STEM Club Competition</h1>
            {teamNumber && <p className="text-xl text-gray-400 mt-2">Team Number: <span className="font-bold text-cyan-300">{teamNumber}</span></p>}
          </header>
          <main>
            {renderCurrentRound()}
          </main>
        </div>
      </div>
    </QuizProvider>
  );
}

export default App;
   
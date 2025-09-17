
import { Round1Answers, Round2Answers } from '../types';

// ============================= IMPORTANT ==============================
// 1. You must deploy the Google Apps Script I provided earlier.
// 2. After deploying, you will get a "Web app URL".
// 3. Paste that URL here to connect the quiz to your Google Sheet.
//
// DO NOT use your spreadsheet link. The URL should start with 'https://script.google.com/macros/s/...'
// ======================================================================
const GOOGLE_SHEET_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbz2od0SoPASTuPEZH7JYkNTHGb7kORvC9P2R7antyWnz1Z90761VF6SgFNZOQIZ8PZaYQ/exec';

const getTimestamp = (): string => {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
  return `${time}.${milliseconds}`;
};

const submitData = async (payload: any): Promise<{ success: true }> => {
  if (!GOOGLE_SHEET_WEB_APP_URL.includes('macros/s')) {
    console.error("The provided URL in services/googleSheetsService.ts does not seem to be a valid Google Apps Script URL.");
    // To prevent the app from breaking during development, we'll simulate a successful submission.
    console.log('Simulating successful submission with payload:', payload);
    return new Promise(resolve => setTimeout(() => resolve({ success: true }), 500));
  }

  const response = await fetch(GOOGLE_SHEET_WEB_APP_URL, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      // Using text/plain is a common workaround for CORS issues with Google Apps Script
      'Content-Type': 'text/plain;charset=utf-8',
    },
    mode: 'cors',
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok. Status: ${response.status}`);
  }
  
  const result = await response.json();
  if (result.status !== 'success') {
    throw new Error(`Submission failed: ${result.message || 'Unknown error'}`);
  }

  return { success: true };
};


export const submitRound1 = async (teamNumber: string, answers: Round1Answers): Promise<{ success: true }> => {
  const payload = {
    teamNumber,
    timestamp: getTimestamp(),
    round: 1,
    answers: { ...answers },
  };
  return submitData(payload);
};

export const submitRound2 = async (teamNumber: string, answers: Round2Answers): Promise<{ success: true }> => {
  // Format answers with multiple selections into comma-separated strings
  const formattedAnswers: { [key: string]: string } = {};
  for (const qId in answers) {
    formattedAnswers[qId] = answers[qId].sort().join(',');
  }

  const payload = {
    teamNumber,
    timestamp: getTimestamp(),
    round: 2,
    answers: formattedAnswers,
  };
  return submitData(payload);
};

export const submitRound3Answer = async (teamNumber: string, questionId: number, answer: string): Promise<{ success: true }> => {
  const payload = {
    teamNumber,
    timestamp: getTimestamp(),
    round: 3,
    // This key now matches the Google Apps Script (`const { questionId, answer } = data;`)
    questionId: questionId,
    answer: answer,
  };
  return submitData(payload);
};

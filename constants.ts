import { QuestionMCQ, QuestionOpenEnded } from './types';

export const ROUND_1_QUESTIONS: QuestionMCQ[] = [
    { id: 1, question: "What is the chemical symbol for Gold?", options: { "A": "Ag", "B": "Au", "C": "Ge", "D": "Ga" } },
    { id: 2, question: "What is considered the 'powerhouse' of the cell?", options: { "A": "Nucleus", "B": "Ribosome", "C": "Mitochondrion", "D": "Cell Wall" } },
    { id: 3, question: "Which planet is known as the Red Planet?", options: { "A": "Venus", "B": "Jupiter", "C": "Mars", "D": "Saturn" } },
    { id: 4, question: "What is the speed of light in a vacuum (approximately)?", options: { "A": "300,000 km/h", "B": "150,000 km/s", "C": "300,000 km/s", "D": "3,000,000 m/s" } },
    { id: 5, question: "What is the hardest natural substance on Earth?", options: { "A": "Quartz", "B": "Diamond", "C": "Topaz", "D": "Corundum" } },
    { id: 6, question: "In computing, what does 'CPU' stand for?", options: { "A": "Central Power Unit", "B": "Computer Processing Unit", "C": "Central Processing Unit", "D": "Core Programming Unit" } },
    { id: 7, question: "What fundamental force pulls objects towards the center of the Earth?", options: { "A": "Magnetism", "B": "Gravity", "C": "Friction", "D": "Tension" } },
    { id: 8, question: "What is the most abundant gas in the Earth's atmosphere?", options: { "A": "Oxygen", "B": "Hydrogen", "C": "Carbon Dioxide", "D": "Nitrogen" } },
    { id: 9, question: "Who is credited with the theory of general relativity?", options: { "A": "Isaac Newton", "B": "Galileo Galilei", "C": "Nikola Tesla", "D": "Albert Einstein" } },
    { id: 10, question: "What is the value of Pi (π) to two decimal places?", options: { "A": "3.12", "B": "3.14", "C": "3.16", "D": "3.18" } },
];

export const ROUND_2_QUESTIONS: QuestionMCQ[] = [
    { id: 1, question: "Which of the following are noble gases? (Select all that apply)", options: { "A": "Helium", "B": "Oxygen", "C": "Neon", "D": "Nitrogen" } },
    { id: 2, question: "Which of the following are primary colors of light (additive colors)? (Select all that apply)", options: { "A": "Red", "B": "Yellow", "C": "Green", "D": "Blue" } },
    { id: 3, question: "Select the mammals from the list below. (Select all that apply)", options: { "A": "Dolphin", "B": "Shark", "C": "Bat", "D": "Penguin" } },
    { id: 4, question: "Which of these are renewable energy sources? (Select all that apply)", options: { "A": "Solar", "B": "Natural Gas", "C": "Wind", "D": "Coal" } },
    { id: 5, question: "Which of the following are parts of a plant cell but not an animal cell? (Select all that apply)", options: { "A": "Cell Wall", "B": "Mitochondrion", "C": "Chloroplast", "D": "Nucleus" } },
    { id: 6, question: "Identify the prime numbers from this list. (Select all that apply)", options: { "A": "9", "B": "7", "C": "13", "D": "15" } },
    { id: 7, question: "Which of these are object-oriented programming languages? (Select all that apply)", options: { "A": "HTML", "B": "Python", "C": "Java", "D": "C++" } },
    { id: 8, question: "Which of the following are located in our Solar System? (Select all that apply)", options: { "A": "The Sun", "B": "Alpha Centauri", "C": "The Asteroid Belt", "D": "Andromeda Galaxy" } },
    { id: 9, question: "Select the units of measurement for electrical current. (Select all that apply)", options: { "A": "Volt", "B": "Ampere", "C": "Watt", "D": "Ohm" } },
    { id: 10, question: "Which of these are considered greenhouse gases? (Select all that apply)", options: { "A": "Oxygen", "B": "Carbon Dioxide", "C": "Methane", "D": "Nitrogen" } },
];

export const ROUND_3_QUESTIONS: QuestionOpenEnded[] = [
    { id: 1, question: "Explain the concept of inertia in your own words." },
    { id: 2, question: "Describe one major difference between a plant cell and an animal cell." },
    { id: 3, question: "What is the main function of the Earth's ozone layer?" },
    { id: 4, question: "Briefly explain the process of photosynthesis." },
    { id: 5, question: "What is an algorithm in the context of computer science?" },
    { id: 6, question: "Define 'black hole' and explain how it is formed." },
    { id: 7, question: "Why is biodiversity important for an ecosystem?" },
    { id: 8, question: "What is the difference between nuclear fission and nuclear fusion?" },
    { id: 9, question: "Explain the role of a catalyst in a chemical reaction." },
    { id: 10, question: "Describe the water cycle with at least three key processes." },
];
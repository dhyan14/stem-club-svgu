
import { QuestionMCQ, QuestionOpenEnded } from './types';

export const ROUND_1_QUESTIONS: QuestionMCQ[] = [
  { id: 1, question: "What is the powerhouse of the cell?", options: { A: "Nucleus", B: "Ribosome", C: "Mitochondrion", D: "Chloroplast" } },
  { id: 2, question: "What does 'c' represent in the equation E=mc²?", options: { A: "Mass", B: "Energy", C: "Speed of light", D: "A constant" } },
  { id: 3, question: "Which planet is known as the Red Planet?", options: { A: "Earth", B: "Mars", C: "Jupiter", D: "Venus" } },
  { id: 4, question: "What is the chemical symbol for gold?", options: { A: "Ag", B: "Au", C: "Pb", D: "Fe" } },
  { id: 5, question: "What is the most abundant gas in Earth's atmosphere?", options: { A: "Oxygen", B: "Carbon Dioxide", C: "Nitrogen", D: "Argon" } },
  { id: 6, question: "Who is credited with the discovery of penicillin?", options: { A: "Marie Curie", B: "Albert Einstein", C: "Isaac Newton", D: "Alexander Fleming" } },
  { id: 7, question: "What force keeps planets in orbit around the sun?", options: { A: "Magnetism", B: "Gravity", C: "Friction", D: "Tension" } },
  { id: 8, question: "What type of simple machine is a screw?", options: { A: "Lever", B: "Pulley", C: "Inclined Plane", D: "Wheel and Axle" } },
  { id: 9, question: "What is the boiling point of water at sea level in Celsius?", options: { A: "90°C", B: "100°C", C: "110°C", D: "120°C" } },
  { id: 10, question: "In computing, what does 'CPU' stand for?", options: { A: "Central Processing Unit", B: "Computer Personal Unit", C: "Central Power Unit", D: "Control Process Unit" } },
];

export const ROUND_2_QUESTIONS: QuestionMCQ[] = [
  { id: 1, question: "Which of the following are noble gases?", options: { A: "Helium", B: "Nitrogen", C: "Neon", D: "Oxygen" } },
  { id: 2, question: "Select all the primary colors of light.", options: { A: "Red", B: "Green", C: "Yellow", D: "Blue" } },
  { id: 3, question: "Which of these are mammals?", options: { A: "Dolphin", B: "Shark", C: "Bat", D: "Penguin" } },
  { id: 4, question: "Which of the following are parts of a standard web URL?", options: { A: "Protocol", B: "Domain Name", C: "File Path", D: "IP Address" } },
  { id: 5, question: "Identify the programming languages from the list.", options: { A: "Python", B: "HTML", C: "Java", D: "CSS" } },
  { id: 6, question: "Which of these are vector quantities (have magnitude and direction)?", options: { A: "Speed", B: "Velocity", C: "Mass", D: "Force" } },
  { id: 7, question: "Select the renewable energy sources.", options: { A: "Solar", B: "Coal", C: "Wind", D: "Natural Gas" } },
  { id: 8, question: "Which of the following are components of blood?", options: { A: "Plasma", B: "Platelets", C: "Neurons", D: "Red Blood Cells" } },
  { id: 9, question: "Which statements about DNA are true?", options: { A: "It is a single helix", B: "It contains thymine", C: "It is found in the nucleus", D: "It is made of amino acids" } },
  { id: 10, question: "Which of these are types of galaxies?", options: { A: "Spiral", B: "Nebula", C: "Elliptical", D: "Irregular" } },
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
   
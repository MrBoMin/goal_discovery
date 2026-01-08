import { Question } from './types';

export const QUESTIONS: Question[] = [
  // Phase 1: Desire Clarity
  {
    id: 1,
    phase: 'Desire Clarity',
    question: 'What do you really, really want? (Open your heart, no filters)',
  },
  {
    id: 2,
    phase: 'Desire Clarity',
    question: 'If you were guaranteed to succeed in everything you do, where would you want to be in three years?',
  },
  {
    id: 3,
    phase: 'Desire Clarity',
    question: 'What does your ideal day look like from morning to night?',
  },
  {
    id: 4,
    phase: 'Desire Clarity',
    question: 'If you could focus on only one thing for the rest of your life, what would it be?',
  },

  // Phase 2: Strength Discovery
  {
    id: 5,
    phase: 'Strength Discovery',
    question: 'What do you find easy that others genuinely struggle with?',
  },
  {
    id: 6,
    phase: 'Strength Discovery',
    question: 'When are you the happiest at work, and what exactly are you doing?',
  },
  {
    id: 7,
    phase: 'Strength Discovery',
    question: 'What did you enjoy doing most as a child?',
  },
  {
    id: 8,
    phase: 'Strength Discovery',
    question: 'Who do you envy and why? (Envy reveals unfulfilled desires)',
  },

  // Phase 3: Leverage & Priority
  {
    id: 9,
    phase: 'Leverage & Priority',
    question: 'If your available time was reduced by 95%, what task(s) would you still perform?',
  },
  {
    id: 10,
    phase: 'Leverage & Priority',
    question: 'Which activities are you doing merely because you\'re "fooling yourself" about their importance?',
  },
  {
    id: 11,
    phase: 'Leverage & Priority',
    question: 'If you could focus on only one thing in the coming twelve months and had to let go of everything else, what would make the biggest impact?',
  },
  {
    id: 12,
    phase: 'Leverage & Priority',
    question: 'If you keep doing what you\'re doing every day, will you achieve your goals? If not, what exactly needs to change?',
  },
];

export const TOTAL_QUESTIONS = QUESTIONS.length;

export const getQuestionById = (id: number): Question | undefined => {
  return QUESTIONS.find(q => q.id === id);
};

export const getNextQuestionId = (currentId: number): number | null => {
  if (currentId >= TOTAL_QUESTIONS) return null;
  return currentId + 1;
};

export const getPreviousQuestionId = (currentId: number): number | null => {
  if (currentId <= 1) return null;
  return currentId - 1;
};

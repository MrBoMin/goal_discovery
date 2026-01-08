import { UserProgress, QuestionResponse } from './types';

const STORAGE_KEY = 'find-your-path-progress';

export const saveProgress = (progress: UserProgress): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  }
};

export const loadProgress = (): UserProgress | null => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
    }
  }
  return null;
};

export const clearProgress = (): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear progress:', error);
    }
  }
};

export const updateResponse = (
  responses: QuestionResponse[],
  questionId: number,
  question: string,
  answer: string
): QuestionResponse[] => {
  const existingIndex = responses.findIndex(r => r.questionId === questionId);

  if (existingIndex >= 0) {
    // Update existing response
    const updated = [...responses];
    updated[existingIndex] = { questionId, question, answer };
    return updated;
  } else {
    // Add new response
    return [...responses, { questionId, question, answer }];
  }
};

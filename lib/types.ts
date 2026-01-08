export interface Question {
  id: number;
  phase: 'Desire Clarity' | 'Strength Discovery' | 'Leverage & Priority';
  question: string;
}

export interface QuestionResponse {
  questionId: number;
  question: string;
  answer: string;
}

export interface AnalysisResult {
  careerArchetype: string;
  archetypeDescription: string;
  keyInsights: string[];
  blindSpots: string[];
  actionPlan: ActionStep[];
}

export interface ActionStep {
  step: number;
  title: string;
  description: string;
}

export interface UserProgress {
  responses: QuestionResponse[];
  currentQuestionId: number;
  lastUpdated: string;
}

export interface EmailCaptureData {
  email: string;
  name?: string;
  currentSituation?: string;
  analysis: AnalysisResult;
}

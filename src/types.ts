export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface KeyConcept {
  id: string;
  title: string;
  summary: string;
  points: string[]; // 4-5 concise points in plain language
}

export interface PracticeMCQ {
  id: string;
  question: string;
  options: [string, string, string, string] | string[];
  correctAnswerIndex: number;
  correctAnswer: string;
  explanation: string;
}

export interface PracticeShortAnswer {
  id: string;
  question: string;
  conciseHighScoringAnswer: string;
  scoringChecklist: string[];
}

export interface PracticeApplicationQuestion {
  id: string;
  realWorldScenario: string;
  question: string;
  applicationModelAnswer: string;
  conceptApplied: string;
}

export interface FlashcardItem {
  front: string;
  back: string;
}

export interface ExamMCQ {
  questionNumber: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface ExamShortQuestion {
  questionNumber: number;
  question: string;
  modelAnswer: string;
}

export interface ExamLongQuestion {
  questionNumber: number;
  question: string;
  modelAnswer: string;
}

export interface ModelExamPaper {
  paperNumber: number;
  title: string;
  duration: string;
  totalMarks: number;
  mcqQuestions: ExamMCQ[]; // 10 questions, 1 mark each
  shortAnswerQuestions: ExamShortQuestion[]; // 10 questions, 5 marks each
  longAnswerQuestions: ExamLongQuestion[]; // 5 questions, 8 marks each
}

export interface StudyScheduleBlock {
  day: string;
  phase: string;
  focusConcepts: string;
  actionItems: string[];
  targetMilestone: string;
}

export interface StudyKit {
  id: string;
  courseTitle: string;
  sourceSummary: string;
  difficulty: DifficultyLevel;
  createdAt: string;
  studySchedule: StudyScheduleBlock[];
  keyConcepts: KeyConcept[]; // 5-7 core concepts, 4-5 concise points each
  practiceQuestions: {
    mcq: PracticeMCQ[];
    shortAnswer: PracticeShortAnswer[];
    applicationBased: PracticeApplicationQuestion[];
  };
  flashcards: FlashcardItem[]; // Strictly max 10
  exams: ModelExamPaper[]; // At least 2 model question papers
}

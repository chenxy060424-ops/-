export type NavTab = 'home' | 'practice' | 'science' | 'profile';

export type ScenarioCategory = '租房' | '实习' | '兼职';

export interface PracticeRound {
  roundNumber: number;
  counterpartLine: string;
  sampleReply: string;
  feedbackFocus: string;
  requiredSignals: {
    keywords: string[];
    clearPoint: string;
    missingHint: string;
  }[];
  defaultClearPoint: string;
  defaultGoodJobClearPoint: string;
  defaultNextToAdd: string;
}

export interface Scenario {
  id: string;
  code: string;
  category: ScenarioCategory;
  title: string;
  shortPreview: string;
  role: string;
  estimatedTime: string;
  background: string;
  goals: string[];
  rounds: PracticeRound[];
  resultTemplate: string;
  defaultGoodTakeaway: string;
  defaultImproveTakeaway: string;
}

export interface ScienceArticle {
  id: string;
  code: string;
  category: ScenarioCategory | '沟通习惯';
  title: string;
  readTime: string;
  whenYouMeet: string;
  checkFirst: string[];
  howToAskLabel: string;
  howToAsk: string;
  linkedScenarioId: string;
}

export interface RoundFeedback {
  clearPoints: string;
  nextToAdd: string;
  isClearEnough: boolean;
  source: 'ai' | 'local';
}

export interface RoundSubmission {
  roundNumber: number;
  counterpartLine: string;
  userReply: string;
  feedback: RoundFeedback;
}

export interface PracticeRecord {
  id: string;
  scenarioId: string;
  scenarioTitle: string;
  category: ScenarioCategory;
  completedRounds: number;
  totalRounds: number;
  completedAt: string;
  goodTakeaway: string;
  improveTakeaway: string;
  userReplies: { roundNumber: number; reply: string }[];
}

export interface SavedScript {
  id: string;
  scenarioId: string;
  scenarioTitle: string;
  content: string;
  savedAt: string;
}

export interface TreeholeEntry {
  id: string;
  content: string;
  createdAt: string;
}

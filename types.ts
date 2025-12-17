export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'model';
  isComplete: boolean;
}

export enum Language {
  TELUGU = 'Telugu',
  HINDI = 'Hindi',
  ENGLISH = 'English'
}

export enum TeachingMode {
  RAMAYANA = 'Ramayana',
  MAHABHARATA = 'Mahabharata',
  BHAGAVATAM = 'Bhagavatam'
}

export enum StudyMode {
  RECITATION = 'Sloka Recitation',
  STORYTELLING = 'Storytelling',
  EXPLANATION = 'Explanation'
}

export interface AudioVisualizerProps {
  isPlaying: boolean;
  isListening: boolean;
}
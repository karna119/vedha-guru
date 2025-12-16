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
  GITA = 'Bhagavad Gita',
  RAMAYANA = 'Ramayana',
  VEMANA = 'Vemana Satakam',
  GENERAL = 'General Conversation'
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
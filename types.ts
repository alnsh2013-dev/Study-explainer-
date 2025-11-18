
export type Language = 'en' | 'ar' | 'da';

export type Theme = 'deep_ocean' | 'cool_mint' | 'sunset_glow' | 'ivory_gold' | 'royal_purple' | 'white' | 'sky_blue' | 'light_green' | 'pastel_purple';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  accent: string;
}

export type AppView = 'chat' | 'mindmap' | 'whiteboard' | 'tools' | 'tables';

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  image?: string;
  sources?: { uri: string; title: string; }[];
}

export interface FileData {
  base64: string;
  mimeType: string;
  name: string;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

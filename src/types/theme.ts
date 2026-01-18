// src/types/theme.ts

export interface UserTheme {
  name: string;
  value: string;
}

export interface UserThemesResponse {
  success: boolean;
  data: UserTheme[];
  timestamp: string;
}

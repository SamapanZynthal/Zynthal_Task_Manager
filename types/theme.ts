export type ThemeColor = {
  background: string;
  foreground: string;
  card: string;
  'card-foreground': string;
  popover: string;
  'popover-foreground': string;
  primary: string;
  'primary-foreground': string;
  secondary: string;
  'secondary-foreground': string;
  muted: string;
  'muted-foreground': string;
  accent: string;
  'accent-foreground': string;
  destructive: string;
  'destructive-foreground': string;
  border: string;
  input: string;
  ring: string;
};

export type ThemeGradients = {
  background: string;
  card: string;
  primary: string;
};

export type Theme = {
  name: string;
  label: string;
  colors: ThemeColor;
  gradients?: ThemeGradients;
};

export type ThemeMode = 'light' | 'dark' | 'system';
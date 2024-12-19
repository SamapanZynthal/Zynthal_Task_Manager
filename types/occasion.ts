export interface Occasion {
  id: string;
  name: string;
  theme: string;
  dates: {
    month: number;
    day: number;
    durationDays: number;
  }[];
}

export interface OccasionTheme {
  name: string;
  label: string;
  description: string;
  colors: {
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
}
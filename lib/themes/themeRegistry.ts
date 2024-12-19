import { Theme } from '@/types/theme';
import { 
  sunsetGradientTheme,
  oceanBreezeGradientTheme,
  forestMistGradientTheme,
  purpleDreamGradientTheme,
} from './gradientThemes';

// Default theme (current theme)
export const defaultTheme: Theme = {
  name: 'default',
  label: 'Classic',
  colors: {
    background: '0 0% 100%',
    foreground: '0 0% 3.9%',
    card: '0 0% 100%',
    'card-foreground': '0 0% 3.9%',
    popover: '0 0% 100%',
    'popover-foreground': '0 0% 3.9%',
    primary: '0 0% 9%',
    'primary-foreground': '0 0% 98%',
    secondary: '0 0% 96.1%',
    'secondary-foreground': '0 0% 9%',
    muted: '0 0% 96.1%',
    'muted-foreground': '0 0% 45.1%',
    accent: '0 0% 96.1%',
    'accent-foreground': '0 0% 9%',
    destructive: '0 84.2% 60.2%',
    'destructive-foreground': '0 0% 98%',
    border: '0 0% 89.8%',
    input: '0 0% 89.8%',
    ring: '0 0% 3.9%',
  },
};

// Ocean theme
export const oceanTheme: Theme = {
  name: 'ocean',
  label: 'Ocean',
  colors: {
    background: '200 100% 97%',
    foreground: '200 50% 3%',
    card: '0 0% 100%',
    'card-foreground': '200 50% 3%',
    popover: '0 0% 100%',
    'popover-foreground': '200 50% 3%',
    primary: '200 100% 50%',
    'primary-foreground': '0 0% 100%',
    secondary: '200 30% 96%',
    'secondary-foreground': '200 50% 3%',
    muted: '200 30% 96%',
    'muted-foreground': '200 50% 45%',
    accent: '200 30% 96%',
    'accent-foreground': '200 50% 3%',
    destructive: '0 100% 50%',
    'destructive-foreground': '0 0% 100%',
    border: '200 30% 89%',
    input: '200 30% 89%',
    ring: '200 100% 50%',
  },
};

// Forest theme
export const forestTheme: Theme = {
  name: 'forest',
  label: 'Forest',
  colors: {
    background: '120 40% 97%',
    foreground: '120 50% 3%',
    card: '0 0% 100%',
    'card-foreground': '120 50% 3%',
    popover: '0 0% 100%',
    'popover-foreground': '120 50% 3%',
    primary: '120 100% 33%',
    'primary-foreground': '0 0% 100%',
    secondary: '120 30% 96%',
    'secondary-foreground': '120 50% 3%',
    muted: '120 30% 96%',
    'muted-foreground': '120 50% 45%',
    accent: '120 30% 96%',
    'accent-foreground': '120 50% 3%',
    destructive: '0 100% 50%',
    'destructive-foreground': '0 0% 100%',
    border: '120 30% 89%',
    input: '120 30% 89%',
    ring: '120 100% 33%',
  },
};

// Sunset theme
export const sunsetTheme: Theme = {
  name: 'sunset',
  label: 'Sunset',
  colors: {
    background: '20 100% 97%',
    foreground: '20 50% 3%',
    card: '0 0% 100%',
    'card-foreground': '20 50% 3%',
    popover: '0 0% 100%',
    'popover-foreground': '20 50% 3%',
    primary: '20 100% 50%',
    'primary-foreground': '0 0% 100%',
    secondary: '20 30% 96%',
    'secondary-foreground': '20 50% 3%',
    muted: '20 30% 96%',
    'muted-foreground': '20 50% 45%',
    accent: '20 30% 96%',
    'accent-foreground': '20 50% 3%',
    destructive: '0 100% 50%',
    'destructive-foreground': '0 0% 100%',
    border: '20 30% 89%',
    input: '20 30% 89%',
    ring: '20 100% 50%',
  },
};

export const themes: Theme[] = [
  defaultTheme,
  oceanTheme,
  forestTheme,
  sunsetTheme,
  sunsetGradientTheme,
  oceanBreezeGradientTheme,
  forestMistGradientTheme,
  purpleDreamGradientTheme,
];
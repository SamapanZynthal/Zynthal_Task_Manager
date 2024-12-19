export type ViewType = 'list' | 'calendar';

export interface ViewOption {
  id: ViewType;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}
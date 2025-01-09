export interface TitleProps {
  variant: 'primary' | 'secondary' | 'tertiary';
  font: 'noto' | 'baskin';
  children: React.ReactNode;
  className?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

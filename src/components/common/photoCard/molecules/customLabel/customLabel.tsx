import cn from '@/src/utils/cn';
import LabelContent from '../../atoms/labelContent/labelContent';
import LabelTitle from '../../atoms/labelTitle/labelTitle';

interface CustomLabelProps {
  title: string;
  titleWeight: 'normal' | 'bold';
  contentWeight: 'normal' | 'bold';
  size: 'big' | 'small';
  children: React.ReactNode;
  className?: string;
}

export default function CustomLabel({
  title,
  titleWeight,
  contentWeight,
  size,
  children,
  className,
}: CustomLabelProps) {
  return (
    <div className={cn('flex justify-between items-center', className)}>
      <LabelTitle
        title={title}
        textSize={size}
        weight={titleWeight}
      />
      <LabelContent
        textSize={size}
        weight={contentWeight}
      >
        {children}
      </LabelContent>
    </div>
  );
}

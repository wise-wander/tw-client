import cn from '@/utils';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function MaxWidthContainer({ children, className }: Props) {
  return (
    <div className={cn('container mx-auto max-w-7xl', className)}>
      {children}
    </div>
  );
}

import cn from '@/utils';

interface Props extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
}

export default function MaxWidthContainer({
  children,
  className,
  ...props
}: Props) {
  return (
    <div
      className={cn('container mx-auto max-w-7xl px-6 py-1', className)}
      {...props}
    >
      {children}
    </div>
  );
}

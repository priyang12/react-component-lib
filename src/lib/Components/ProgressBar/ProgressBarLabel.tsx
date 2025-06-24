import clsx from 'clsx';

type Placement = 'left' | 'right' | 'center';

export interface ProgressBarLabelProps
   extends React.ComponentPropsWithoutRef<'div'> {
   label: string;
   placement?: Placement;
   className?: string;
}

export default function ProgressBarLabel({
   label,
   placement = 'center',
   className,
}: ProgressBarLabelProps) {
   return (
      <span
         className={clsx(
            'ProgressBar-label',
            placement && `ProgressBar-label--${placement}`,
            className
         )}
      >
         {label}
      </span>
   );
}

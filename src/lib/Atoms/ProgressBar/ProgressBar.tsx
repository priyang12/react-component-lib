import { clsx } from 'clsx';
import './ProgressBar.scss';

/**
 * Props for the `ProgressBar` component.
 *
 * @export
 * @interface ProgressBarProps
 */
export type ProgressBarProps = {
   className?: string;
   value: number;
   max: number;
   min: number;
   children: React.ReactNode;
};

function ProgressBarLabel({
   label,
   className,
}: {
   label: string;
   className?: string;
}) {
   return <span className={clsx('ProgressBar-label', className)}>{label}</span>;
}

function ProgressBar({
   className,
   value,
   max,
   min,
   children,
   ...props
}: ProgressBarProps) {
   const percentage = ((value - min) / (max - min)) * 100;
   const ProgressClassName = clsx('ProgressBar', className);

   return (
      <div
         className={ProgressClassName}
         role="progressbar"
         aria-valuenow={percentage}
         {...props}
      >
         <div className="progress-bar" style={{ width: `${percentage}%` }}>
            {children}
         </div>
      </div>
   );
}
export { ProgressBar, ProgressBarLabel };

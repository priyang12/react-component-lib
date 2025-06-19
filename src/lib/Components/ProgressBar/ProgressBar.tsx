import { clsx } from 'clsx';
import ProgressBarLabel from './ProgressBarLabel';
import './ProgressBar.scss';

type VariantType =
   | 'failure'
   | 'failure-border'
   | 'success'
   | 'success-border'
   | 'info'
   | 'info-border'
   | 'warning'
   | 'warning-border';

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
   variant?: VariantType;
   children: React.ReactNode;
};

function ProgressBar({
   className,
   value,
   max,
   min,
   variant,
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
         <div
            className={clsx('progress-bar', `${variant}-bar`)}
            style={{ width: `${percentage}%` }}
         >
            {children}
         </div>
      </div>
   );
}
export { ProgressBar, ProgressBarLabel };

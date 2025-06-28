import { clsx } from 'clsx';
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
 * Props for the ProgressBar component.
 *
 * Displays a visual progress indicator with customizable variant styles and accessible semantics.
 *
 * @property value - Current progress value.
 * @property max - Maximum progress value.
 * @property min - Minimum progress value.
 * @property variant - Optional visual style for the progress bar. Variants include:
 * `'failure'`, `'failure-border'`, `'success'`, `'success-border'`, `'info'`, `'info-border'`, `'warning'`, `'warning-border'`.
 * @property children - Optional content displayed inside the progress bar.
 */
export interface ProgressBarProps
   extends React.ComponentPropsWithoutRef<'div'> {
   /** The current progress value. */
   value: number;
   /** The maximum value the progress bar can represent. */
   max: number;
   /** The minimum value the progress bar can represent. */
   min: number;
   /** Optional visual theme for the progress bar. */
   variant?: VariantType;
   /** Content rendered inside the progress bar (e.g., text or icons). */
   children: React.ReactNode;
}

/**
 * ProgressBar component that visually represents task completion or progress.
 *
 * Renders a filled bar whose width corresponds to the percentage completion based on `value`, `min`, and `max`.
 * Supports color variants for different semantic statuses (success, failure, etc.).
 *
 * Includes accessibility features using ARIA attributes.
 *
 * @returns A styled `<div>` container representing the progress, with optional inner content.
 *
 * @example
 * ```tsx
 *<ProgressBar value={40} min={0} max={100} variant="success">
 *     40%
 *</ProgressBar>
 *```
 */
function ProgressBar({
   value,
   max,
   min,
   variant,
   className,
   children,
   ...props
}: ProgressBarProps) {
   const clampedValue = Math.min(Math.max(value, min), max);
   const percentage = ((clampedValue - min) / (max - min)) * 100;
   const ProgressClassName = clsx('ProgressBar', className);

   console.log(variant);

   return (
      <div
         className={ProgressClassName}
         role="progressbar"
         aria-valuenow={percentage}
         aria-valuemin={min}
         aria-valuemax={max}
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
export default ProgressBar;

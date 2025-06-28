import clsx from 'clsx';

/**
 * Props for the ProgressBarLabel component.
 *
 * Provides a textual label that can be positioned within or around a `ProgressBar`.
 *
 * @property label - The label text to display.
 * @property placement - Position of the label relative to the progress bar. Options are `'left'`, `'right'`, or `'center'`. Defaults to `'center'`.
 * @property className - Optional additional class names for styling.
 */
export interface ProgressBarLabelProps
   extends React.ComponentPropsWithoutRef<'span'> {
   /** The label text displayed in relation to the progress bar. */
   progressLabelText: string;
   /** Placement of the label: `'left'`, `'right'`, or `'center'`. */
   placement?: 'left' | 'right' | 'center';
   /** Optional additional class name(s) for the label container. */
   className?: string;
}

export default function ProgressBarLabel({
   progressLabelText,
   placement = 'center',
   className,
   ...props
}: ProgressBarLabelProps) {
   return (
      <span
         className={clsx(
            'ProgressBar-label',
            placement && `ProgressBar-label--${placement}`,
            className
         )}
         {...props}
      >
         {progressLabelText}
      </span>
   );
}

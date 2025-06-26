import * as React from 'react';
import clsx from 'clsx';
import './StatusDot.scss';

/**
 * Props for the StatusDot component.
 *
 * Extends standard HTML span props and provides visual status indicators.
 *
 * @property status - Represents the current status. Options are `'online'`, `'offline'`, `'idle'`, `'error'`, or `'unknown'`.
 * @property size - Controls the size of the status dot. Options are `'sm'`, `'md'`, or `'lg'`. Defaults to `'md'`.
 * @property label - Optional accessible label for screen readers. Falls back to the `status` value if not provided.
 */
export interface StatusDotProps extends React.ComponentPropsWithoutRef<'span'> {
   status: 'online' | 'offline' | 'idle' | 'error' | 'unknown';
   size?: 'sm' | 'md' | 'lg';
   label?: string;
}

/**
 * Small visual indicator component for status representation.
 *
 * Renders a colored dot that communicates system or user status.
 * Includes ARIA support for accessibility with live updates and labels.
 */

const StatusDot: React.FC<StatusDotProps> = ({
   status,
   size = 'md',
   label,
}) => {
   const className = clsx(
      'status-dot',
      `status-dot--${status}`,
      `status-dot--${size}`
   );

   return (
      <span
         className={className}
         role="status"
         aria-label={label || status}
         aria-live="polite"
      />
   );
};

export default StatusDot;

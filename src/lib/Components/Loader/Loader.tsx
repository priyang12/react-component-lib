import * as React from 'react';
import clsx from 'clsx';
import './Loader.scss';

/**
 * Props for the Loader component.
 *
 * Extends standard HTML div props and provides customizable loading indicators.
 *
 * @property loadingText - Optional text to display alongside the loader animation.
 * @property loadingType - Specifies the style of the loading spinner. Options are `'default'`, `'ball'`, `'ring'`, `'bounce'`, or `'ripple'`. Defaults to `'default'`.
 * @property size - Controls the size of the loader. Options are `'small'`, `'medium'`, or `'large'`. Defaults to `'medium'`.
 */
export interface LoaderProps extends React.ComponentPropsWithoutRef<'div'> {
   /** Optional text to display alongside the loader animation. */
   loadingText?: string;
   /**  Specifies the style of the loading spinner.  */
   loadingType?: 'default' | 'ball' | 'ring' | 'bounce' | 'ripple';
   /** Controls the size of the loader.*/
   size?: 'small' | 'medium' | 'large';
}

/**
 * Animated loader component for indicating loading states.
 *
 * Supports multiple animation types and optional descriptive text.
 * Useful for async operations, data fetching, and UI transitions.
 */
function Loader({
   loadingText,
   size = 'medium',
   loadingType = 'default',
   className,
   ...props
}: LoaderProps) {
   return (
      <div
         role="presentation"
         aria-busy="true"
         aria-live="assertive"
         className={clsx('loader', size, className)}
         {...props}
      >
         {loadingText ? (
            <>
               <div className={`spinner-${loadingType}`} />
               <span className="loading-text">{loadingText}</span>
            </>
         ) : (
            <div className={`spinner-${loadingType}`} />
         )}
      </div>
   );
}

export default Loader;

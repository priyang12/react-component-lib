import * as React from 'react';
import { clsx } from 'clsx';
import './VercelButton.scss';

const ShadowAnimation = ({
   children,
   AnimationCss,
   className,
   ...props
}: React.ComponentPropsWithoutRef<'button'> & {
   AnimationCss: 'border-animation' | 'vercel-animation';
}) => {
   const VercelButtonClass = clsx('neon-bg', AnimationCss, className);

   return (
      <button className={VercelButtonClass} {...props}>
         {children}
      </button>
   );
};

export default ShadowAnimation;

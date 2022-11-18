import * as React from 'react';
import { clsx } from 'clsx';
import './VercelButton.scss';

const ShadowAnimation: React.FC<{
   children: React.ReactNode;
   className?: string;
   AnimationCss: string;
}> = ({ children, AnimationCss, className, ...props }) => {
   const VercelButtonClass = clsx('neon-bg', AnimationCss, className);

   return (
      <div className={VercelButtonClass} {...props}>
         {children}
      </div>
   );
};

export default ShadowAnimation;

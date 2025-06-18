import * as React from 'react';
import { clsx } from 'clsx';
import './VercelButton.scss';

const ShadowAnimation = ({
   children,
   AnimationCss,
   className,
   ...props
}: React.ComponentPropsWithoutRef<'div'> & {
   AnimationCss: 'border-animation' | 'vercel-animation';
}) => {
   const VercelButtonClass = clsx('neon-bg', AnimationCss, className);

   return (
      <div className={VercelButtonClass} {...props}>
         {children}
      </div>
   );
};

export default ShadowAnimation;

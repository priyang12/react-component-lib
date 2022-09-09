import * as React from 'react';
import { cx } from '@chakra-ui/utils';
import './VercelButton.scss';

const ShadowAnimation: React.FC<{
   children: React.ReactNode;
   className?: string;
   AnimationCss: string;
}> = ({ children, AnimationCss, className, ...props }) => {
   const VercelButtonClass = cx('neon-bg', AnimationCss, className);

   return (
      <div className={VercelButtonClass} {...props}>
         {children}
      </div>
   );
};

export default ShadowAnimation;

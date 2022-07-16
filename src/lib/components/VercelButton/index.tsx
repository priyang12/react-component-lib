import * as React from 'react';
import './VercelButton.scss';

const ShadowAnimation: React.FC<{
   children: React.ReactNode;
   className?: string;
   AnimationCss: string;
}> = ({ children, AnimationCss }) => {
   return <div className={`neon-bg ${AnimationCss}`}>{children}</div>;
};

export default ShadowAnimation;

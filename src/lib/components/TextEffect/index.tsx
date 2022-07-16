import * as React from 'react';
import './TextEffect.scss';

interface TextEffectProps {
   Element: React.ElementType;
   size?: 'small' | 'medium' | 'large';
   ContainerText?: string;
   Delay?: number;
   animateTime?: number;
   color1: string;
   color2: string;
}

function TextEffect({
   Element,
   size,
   ContainerText,
   Delay,
   animateTime,
   color1 = '#e91e63',
   color2 = '#201f55',
}: TextEffectProps): React.ReactElement {
   return (
      <div className="container">
         <Element
            className="Gradtext"
            style={{
               fontSize: `${size}`,
               background: `linear-gradient(90deg,${color1}, ${color2})`,
               WebkitBackgroundClip: 'text',
               backgroundClip: 'text',
               color: 'transparent',
               animationDelay: `${Delay}`,
               animation: `GradTextAnimation ${animateTime}s ease infinite`,
            }}
         >
            {ContainerText}
         </Element>
         <Element
            className="NormalText"
            style={{
               fontSize: `${size}`,
               animationDelay: `${Delay}`,
               animation: `NormalText ${animateTime}s ease infinite`,
            }}
         >
            {ContainerText}
         </Element>
      </div>
   );
}
TextEffect.defaultProps = {
   animateTime: '2',
};

export default TextEffect;

import * as React from 'react';
import './TextEffect.scss';

export interface TextEffectProps extends React.ComponentPropsWithoutRef<'div'> {
   Element: React.ElementType;
   size?: string;
   ContainerText?: string;
   Delay?: string;
   animateTime?: string;
   color1?: string;
   color2?: string;
}
/**
 * TextEffect is a functional component that renders a text effect with customizable size, container text, delay, animate time, color1, and color2 options.
 *
 * @param {Object} props - The props for the TextEffect component.
 * @param {React.ElementType} props.Element - The element type for the text effect.
 * @param {string} props.size - The size of the text effect.
 * @param {string} props.ContainerText - The text that will be displayed in the text effect.
 * @param {string} props.Delay - The delay of the text effect animation.
 * @param {string} props.animateTime - The duration of the text effect animation.
 * @param {string} props.color1 - The starting color of the text effect gradient.
 * @param {string} props.color2 - The ending color of the text effect gradient.
 * @param {string} props.className - A classname for the text effect container.
 * @param {any} props.[x: string] - Other props that will be spread onto the text effect container element.
 *
 * @return {ReactElement} - The rendered text effect element.
 */
function TextEffect({
   Element,
   size,
   ContainerText,
   Delay,
   animateTime = '2',
   color1 = '#e91e63',
   color2 = '#201f55',
   className,
   ...props
}: TextEffectProps) {
   return (
      <div className={className} {...props}>
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
         </Element>
      </div>
   );
}

export default TextEffect;

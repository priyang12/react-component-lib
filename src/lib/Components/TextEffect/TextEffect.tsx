import * as React from 'react';
import './TextEffect.scss';

/**
 * Props for the `TextEffect` component.
 *
 * Extends standard HTML `div` props and provides customizable animated gradient text rendering.
 *
 * @property Element - The HTML or React component used to render the main animated text.
 * @property size - Font size of the text (e.g., `'2rem'`, `'24px'`).
 * @property ContainerText - The text content to be displayed inside the animated effect.
 * @property Delay - Delay before animation starts (e.g., `'1s'`).
 * @property animateTime - Duration of one animation cycle in seconds. Defaults to `'2'`.
 * @property color1 - Starting color for the gradient animation. Defaults to `'#e91e63'`.
 * @property color2 - Ending color for the gradient animation. Defaults to `'#201f55'`.
 */
export interface TextEffectProps extends React.ComponentPropsWithoutRef<'div'> {
   /** The element tag or component used to render the animated text. */
   Element: React.ElementType;
   /** Font size for the text (e.g., `'2rem'`, `'24px'`). */
   size?: string;
   /** The actual string to be rendered inside the animated effect. */
   ContainerText?: string;
   /** Delay before the animation begins. */
   Delay?: string;
   /** Duration of the gradient animation (in seconds). Defaults to `'2'`. */
   animateTime?: string;
   /** Starting color of the gradient animation. */
   color1?: string;
   /** Ending color of the gradient animation. */
   color2?: string;
}

/**
 * Animated gradient `TextEffect` component.
 *
 * Renders stylized, animated text using a gradient that loops infinitely. Can be customized with animation timing, gradient colors, and element type.
 *
 * @returns A styled element (e.g., `<h1>`, `<span>`) with animated gradient text overlay.
 *
 * @example
 * ```tsx
 * <TextEffect
 *   Element="h1"
 *   size="3rem"
 *   ContainerText="Hello World"
 *   Delay="0.5s"
 *   animateTime="3"
 *   color1="#ff0080"
 *   color2="#7928ca"
 * />
 * ```
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

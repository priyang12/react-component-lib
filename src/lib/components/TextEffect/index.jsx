import React from 'react';
import './TextEffect.scss';
function TextEffect({ Element, size, ContainerText, Delay }) {
   return (
      <div className="container">
         <Element
            className="Gradtext"
            style={{
               fontSize: `${size}`,
               animationDelay: `${Delay}`,
            }}
         >
            {ContainerText}
         </Element>
         <Element
            className="NormalText"
            style={{
               fontSize: `${size}`,
               animationDelay: `${Delay}`,
            }}
         >
            {ContainerText}
         </Element>
      </div>
   );
}
export default TextEffect;

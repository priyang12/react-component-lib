import React from 'react';
import './GradientBG.scss';
function GradientBG({ Element, children, focused, Animate }) {
   return (
      <Element className={`${focused ? 'focused' : ''} bg ${Animate}`}>
         {children}
      </Element>
   );
}
export default GradientBG;

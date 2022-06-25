import React from 'react';
import './Ring.scss';
function Ring({
   Element,
   children,
   radius,
   ringColor,
   ringWidth = '5px',
   OuterRingColor,
}) {
   return (
      <Element>
         <div
            className="ring"
            style={{
               '--ring-color': ringColor,
               '--ring-width': `calc(${ringWidth} + 2px)`,
               '--ring-offset-color': OuterRingColor,
               borderRadius: radius,
            }}
         >
            {children}
         </div>
      </Element>
   );
}

Ring.defaultProps = {
   Element: 'div',
};

export default Ring;

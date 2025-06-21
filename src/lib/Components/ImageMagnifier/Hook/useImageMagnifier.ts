import * as React from 'react';

//  Future Enhancements
// Add touch support (mobile zoom)
// Support controlled mode (pass x, y manually)
// Support portals for overlays (need to think about it)

export function useImageMagnifier() {
   const [[x, y], setXY] = React.useState([0, 0]);
   const [[imgWidth, imgHeight], setSize] = React.useState([0, 0]);
   const [showMagnifier, setShowMagnifier] = React.useState(false);

   const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
      const { width, height } = e.currentTarget.getBoundingClientRect();
      setSize([width, height]);
      setShowMagnifier(true);
   };

   const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
      const { top, left } = e.currentTarget.getBoundingClientRect();
      const x = e.pageX - left - window.pageXOffset;
      const y = e.pageY - top - window.pageYOffset;
      setXY([x, y]);
   };

   const handleMouseLeave = () => {
      setShowMagnifier(false);
   };

   return {
      x,
      y,
      imgWidth,
      imgHeight,
      showMagnifier,
      eventHandlers: {
         onMouseEnter: handleMouseEnter,
         onMouseMove: handleMouseMove,
         onMouseLeave: handleMouseLeave,
      },
   };
}

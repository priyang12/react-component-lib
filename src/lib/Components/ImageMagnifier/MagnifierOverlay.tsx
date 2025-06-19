import React from 'react';
import './ImageMagnifier.scss';

interface MagnifierOverlayProps {
   imgWidth: number;
   imgHeight: number;
   src: string;
   zoomLevel: number;
}

const MagnifierOverlay: React.FC<MagnifierOverlayProps> = ({
   imgWidth,
   imgHeight,
   src,
   zoomLevel,
}) => {
   return (
      <div
         className="magnifier"
         style={
            {
               backgroundColor: 'white',
               backgroundImage: `url('${src}')`,
               backgroundRepeat: 'no-repeat',
               backgroundSize: `${imgWidth * zoomLevel}px ${
                  imgHeight * zoomLevel
               }px`,
            } as React.CSSProperties
         }
      />
   );
};

export default MagnifierOverlay;

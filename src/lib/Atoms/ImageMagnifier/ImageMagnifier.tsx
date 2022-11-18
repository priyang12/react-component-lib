import * as React from 'react';
import { clsx } from 'clsx';
import './ImageMagnifier.scss';

export interface ImageMagnifierProps {
   src: string;
   width: string;
   height: string;
   magnifierHeight: number;
   magnifierWidth: number;
   zoomLevel: number;
}

function ImageMagnifier({
   src,
   width,
   height,
   magnifierHeight = 100,
   magnifierWidth = 100,
   zoomLevel = 1.5,
   ...props
}: ImageMagnifierProps & React.ComponentPropsWithoutRef<'div'>) {
   const [[x, y], setXY] = React.useState([0, 0]);
   const [[imgWidth, imgHeight], setSize] = React.useState([0, 0]);
   const [showMagnifier, setShowMagnifier] = React.useState(false);

   return (
      <div className={clsx('imageContainer', props.className)} {...props}>
         <img
            style={{
               height: height,
               width: width,
            }}
            onMouseEnter={e => {
               // update image size and turn-on magnifier
               const elem = e.currentTarget;
               const { width, height } = elem.getBoundingClientRect();
               setSize([width, height]);
               setShowMagnifier(true);
            }}
            onMouseMove={e => {
               // update cursor position
               const elem = e.currentTarget;
               const { top, left } = elem.getBoundingClientRect();

               // calculate cursor position on the image
               const x = e.pageX - left - window.pageXOffset;
               const y = e.pageY - top - window.pageYOffset;
               setXY([x, y]);
            }}
            onMouseLeave={() => {
               // close magnifier
               setShowMagnifier(false);
            }}
            src={src}
            alt="ImageMagnifier"
         />
         <div
            className="magnifier"
            style={{
               display: showMagnifier ? '' : 'none',
               position: 'absolute',

               // prevent magnifier blocks the mousemove event of img
               pointerEvents: 'none',
               // set size of magnifier
               height: `${magnifierHeight}px`,
               width: `${magnifierWidth}px`,
               // move element center to cursor pos
               top: `${y - magnifierHeight / 2}px`,
               left: `${x - magnifierWidth / 2}px`,
               opacity: '1', // reduce opacity so you can verify position
               border: '1px solid lightgray',
               backgroundColor: 'white',
               backgroundImage: `url('${src}')`,
               backgroundRepeat: 'no-repeat',

               //calculate zoomed image size
               backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight *
                  zoomLevel}px`,

               //calculate position of zoomed image.
               backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
               backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
            }}
         ></div>
      </div>
   );
}
export default ImageMagnifier;

import ImageMagnifier from './ImageMagnifier';
import MagnifierOverlay, { MagnifierOverlayProps } from './MagnifierOverlay';
import { useImageMagnifier } from './Hook/useImageMagnifier';
import type { Meta, StoryFn } from '@storybook/react';

export default {
   title: 'Components/ImageMagnifier',
   component: ImageMagnifier,
   args: {
      width: '500px',
      src: 'https://picsum.photos/600/600',
      renderImage: ({
         handleMouseEnter,
         handleMouseLeave,
         handleMouseMove,
      }) => (
         <img
            src={'https://picsum.photos/600/600'}
            alt="Zoomable"
            style={{ width: '500px', height: '500px' }}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
         />
      ),
   },
   decorators: [
      (Story) => (
         <div className="container">
            <Story />
         </div>
      ),
   ],
} as Meta<typeof ImageMagnifier>;

export const Template: StoryFn<typeof ImageMagnifier> = (args) => (
   <ImageMagnifier {...args} />
);

export const CustomZoomLevel = Template.bind({});
CustomZoomLevel.args = {
   zoomLevel: 2.5,
};

export const CustomMagnifierSize = Template.bind({});
CustomMagnifierSize.args = {
   magnifierHeight: 150,
   magnifierWidth: 150,
};

const CustomOverlay: React.FC<MagnifierOverlayProps> = ({
   imgWidth,
   imgHeight,
   src,
   zoomLevel,
}) => {
   return (
      <div
         // className="magnifier" we pass default class here if we want
         className="absolute pointer-events-none border-[5px] border-white rounded-full bg-white"
         style={{
            height: 'var(--magnifierHeight)',
            width: 'var(--magnifierWidth)',
            top: 'calc(var(--y) - var(--magnifierHeight) - 5%)',
            left: 'calc(var(--x) + 10%)',
            backgroundPositionX:
               'calc(var(--x) * -1 * var(--zoomLevel) + var(--magnifierWidth) / 2)',
            backgroundPositionY:
               'calc(var(--y) * -1 * var(--zoomLevel) + var(--magnifierHeight) / 2)',
            backgroundImage: `url('${src}')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${imgWidth * zoomLevel}px ${
               imgHeight * zoomLevel
            }px`,
         }}
      />
   );
};

export const WithCustomOverlay = Template.bind({});
WithCustomOverlay.args = {
   OverlayComponent: CustomOverlay,
   magnifierWidth: 200,
   magnifierHeight: 200,
};

export const BuildWithHookAndOverlay: StoryFn = () => {
   const { x, y, imgWidth, imgHeight, showMagnifier, eventHandlers } =
      useImageMagnifier();

   const src = 'https://picsum.photos/600/600';
   const magnifierWidth = 120;
   const magnifierHeight = 120;
   const zoomLevel = 2;

   return (
      <div
         className="imageContainer"
         style={
            {
               '--x': `${x}px`,
               '--y': `${y}px`,
               '--magnifierWidth': `${magnifierWidth}px`,
               '--magnifierHeight': `${magnifierHeight}px`,
               '--zoomLevel': zoomLevel,
            } as React.CSSProperties
         }
      >
         <img
            src={src}
            alt="Zoomable Custom"
            style={{ width: '500px', height: '500px' }}
            {...eventHandlers}
         />

         {showMagnifier && (
            <MagnifierOverlay
               imgWidth={imgWidth}
               imgHeight={imgHeight}
               src={src}
               zoomLevel={zoomLevel}
            />
         )}
      </div>
   );
};

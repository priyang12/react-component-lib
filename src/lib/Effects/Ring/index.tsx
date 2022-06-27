import React from 'react';
import { chakra } from '@chakra-ui/system';
import './Ring.scss';

function Ring(props: any): React.ReactElement {
   const {
      Element,
      children,
      radius,
      ringColor,
      ringWidth = '5px',
      OuterRingColor,
   } = props;
   return (
      <chakra.div as={Element}>
         <div
            className="ring"
            style={{
               // @ts-ignore
               '--ring-color': ringColor,
               '--ring-width': `calc(${ringWidth} + 2px)`,
               '--ring-offset-color': OuterRingColor,
               borderRadius: radius,
            }}
         >
            {children}
         </div>
      </chakra.div>
   );
}

Ring.defaultProps = {
   Element: 'div',
};

export default Ring;

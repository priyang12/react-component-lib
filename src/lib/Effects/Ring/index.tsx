import React from 'react';
import { chakra, ChakraProps } from '@chakra-ui/system';
import './Ring.scss';

interface RingProps extends ChakraProps {
   radius?: string;
   ringColor?: string;
   ringWidth?: string;
   OuterRingColor?: string;
   Element?: React.ElementType;
   children: React.ReactNode;
}

function Ring(props: RingProps) {
   const {
      Element,
      children,
      radius,
      ringColor,
      ringWidth = '5px',
      OuterRingColor,
      ...restProps
   } = props;
   return (
      <chakra.div as={Element} {...restProps}>
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

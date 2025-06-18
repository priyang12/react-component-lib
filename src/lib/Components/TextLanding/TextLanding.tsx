import * as React from 'react';
import { TextEffect } from '../../Components/TextEffect';
import './TextLanding.scss';

function TextLanding(props: any): React.ReactElement {
   return (
      <div {...props}>
         <TextEffect
            ContainerText="First Test"
            Element="p"
            size="4rem"
            animateTime="2"
         />

         <TextEffect
            ContainerText="Second Test"
            Element="p"
            size="5rem"
            animateTime="3"
            color1="red"
            color2="yellow"
         />
         <TextEffect
            ContainerText="Third Test"
            Element="p"
            size="6rem"
            animateTime="5"
            color1="blue"
            color2="green"
         />
      </div>
   );
}
export default TextLanding;

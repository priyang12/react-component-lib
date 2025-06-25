import * as React from 'react';
import PopContainer from './components/PopContainer';
import PopContent from './components/PopContent';
import PopTrigger from './components/PopTrigger';
import PopClose from './components/PopClose';
import './PopOver.scss';

// Break it into clear subcomponents:
// Popover: Context provider (state, positioning)
// PopoverTrigger: The element that opens/closes the popover
// PopoverContent: The Content element (need to add floating with portal and floating-ui)
// (Need to add) PopoverArrow, PopoverHeader, PopoverFooter for styling clarity

// function PopOver({ children, ...props }: PopOverProps) {
//    return (
//       <PopContainer {...props}>
//          <PopTrigger>
//             <Button>Open</Button>
//          </PopTrigger>
//  <PopContent >
//   Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
//        placeat labore impedit in saepe, atque tempora aspernatur
//        consequuntur iure unde velit odio nulla harum mollitia rerum quo
//        adipisci ipsam sequi.
//        <PopClose />
//   </PopContent>
//       </PopContainer>
//    );
// }

const PopOver = {
   Trigger: PopTrigger,
   Content: PopContent,
   Container: PopContainer,
   Close: PopClose,
};

export default PopOver;

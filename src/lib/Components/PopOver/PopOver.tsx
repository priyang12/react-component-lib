import * as React from 'react';
import PopContainer from './components/PopContainer';
import PopContent from './components/PopContent';
import PopTrigger from './components/PopTrigger';
import PopClose from './components/PopClose';
import './PopOver.scss';
import PopPortal from './components/PopPortal';

// Break it into clear subcomponents:
// Popover: Context provider (state, positioning)
// PopoverTrigger: The element that opens/closes the popover
// PopoverContent: The Content element.
// (Need to add) PopoverArrow, PopoverHeader, PopoverFooter for styling clarity
// Triggered options by click, hover, focus.
// might add control state pass later.

const PopOver = {
   PopOverPortal: PopPortal,
   Trigger: PopTrigger,
   Content: PopContent,
   Container: PopContainer,
   Close: PopClose,
};

export default PopOver;

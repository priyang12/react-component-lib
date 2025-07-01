import PopContainer from './components/PopContainer';
import PopContent from './components/PopContent';
import PopTrigger from './components/PopTrigger';
import PopClose from './components/PopClose';
import PopPortal from './components/PopPortal';
import PopArrow from './components/PopArrow';
import './PopOver.scss';

// Break it into clear subcomponents:
// Popover: Context provider (state, positioning)
// PopoverTrigger: The element that opens/closes the popover
// PopoverContent: The Content element.
// (Need to add) PopoverArrow, PopoverHeader, PopoverFooter for styling clarity
// Triggered options by click, hover, focus.
// fix focus in Content.
// need to add aria.
// might add control state pass later.

const PopOver = {
   Portal: PopPortal,
   Trigger: PopTrigger,
   Content: PopContent,
   Container: PopContainer,
   Close: PopClose,
   Arrow: PopArrow,
};

export default PopOver;

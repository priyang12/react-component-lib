import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import { AccordionContext } from '../../Module/Accordion/Accordion';
import './AccordionItems.scss';

export interface AccordionButtonProps {
   index: number;
}

export function AccordionButton({
   index,
   children,
   ...props
}: AccordionButtonProps & React.ComponentPropsWithoutRef<'div'>) {
   const { handleItemClick, indexes } = React.useContext(AccordionContext);

   const ref = React.useRef<HTMLDivElement>(null);

   const KeyDown: React.ComponentProps<'div'>['onKeyDown'] = e => {
      const keyCode = e.code;
      if (keyCode === 'Enter' || keyCode === 'Space') handleItemClick(index);
      else if (keyCode === 'ArrowDown') {
         const nextItem = ref.current?.parentElement?.querySelector(
            `[data-index="${index + 1}"]`
         );
         if (nextItem) (nextItem as HTMLElement).focus();
      } else if (keyCode === 'ArrowUp') {
         const prevItem = ref.current?.parentElement?.querySelector(
            `[data-index="${index - 1}"]`
         );
         if (prevItem) (prevItem as HTMLElement).focus();
      }
   };

   return (
      <div
         className="Accordion-header"
         role="button"
         ref={ref}
         data-index={index}
         aria-expanded={indexes.includes(index)}
         tabIndex={0}
         onKeyDown={KeyDown}
         onClick={() => handleItemClick(index)}
         {...props}
      >
         {children}
      </div>
   );
}

interface AccordionContentType {
   index: number;
}

export function AccordionContent({
   index,
   children,
   ...props
}: AccordionContentType & React.ComponentPropsWithoutRef<'div'>) {
   const { indexes } = React.useContext(AccordionContext);
   return (
      <div {...props}>
         <CSSTransition
            in={indexes.includes(index)}
            timeout={200}
            classNames="content"
            mountOnEnter
            unmountOnExit
         >
            {children}
         </CSSTransition>
      </div>
   );
}

interface AccordionIconType {
   index: number;
   OpenIcon: React.ReactNode;
   CloseIcon: React.ReactNode;
}

export function AccordionIcon({
   index,
   CloseIcon,
   OpenIcon,
}: AccordionIconType & React.ComponentPropsWithoutRef<'span'>) {
   const { indexes } = React.useContext(AccordionContext);

   return <span>{indexes.includes(index) ? CloseIcon : OpenIcon}</span>;
}

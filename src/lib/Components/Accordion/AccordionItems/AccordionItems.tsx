import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import { AccordionContext } from '../Accordion';
import './AccordionItems.scss';

export interface AccordionButtonProps {
   index: number;
}
/**
 * AccordionButton is a component that represents a button within an accordion.
 *
 * @param index - The index of the accordion item that the button belongs to.
 * @param children - The content of the button.
 * @param props - Additional props to be passed to the button element.
 *
 * @returns a div element that acts as a button.
 *
 * @example
 *
 * <AccordionButton index={0}>Click me</AccordionButton>
 */
export function AccordionButton({
   index,
   children,
   ...props
}: AccordionButtonProps & React.ComponentPropsWithoutRef<'div'>) {
   const { handleItemClick, indexes } = React.useContext(AccordionContext);

   const ref = React.useRef<HTMLDivElement>(null);

   const KeyDown: React.ComponentProps<'div'>['onKeyDown'] = (e) => {
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
/**
 * AccordionContent is a component that represents the content of an accordion item.
 *
 * @param index - The index of the accordion item that the content belongs to.
 * @param children - The content of the accordion item.
 * @param props - Additional props to be passed to the div element.
 *
 * @returns a div element that contains the accordion item content.
 *
 * @example
 *
 * <AccordionContent index={0}>Item content</AccordionContent>
 */
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
/**
 * AccordionIcon is a component that represents an icon within an accordion item.
 *
 * @param index - The index of the accordion item that the icon belongs to.
 * @param OpenIcon - The icon to be displayed when the accordion item is open.
 * @param CloseIcon - The icon to be displayed when the accordion item is closed.
 *
 * @returns a span element that contains the appropriate icon.
 *
 * @example
 *
 * <AccordionIcon
 *   index={0}
 *   OpenIcon={<i className="fas fa-chevron-up" />}
 *   CloseIcon={<i className="fas fa-chevron-down" />}
 * />
 */
export function AccordionIcon({
   index,
   CloseIcon,
   OpenIcon,
}: AccordionIconType & React.ComponentPropsWithoutRef<'span'>) {
   const { indexes } = React.useContext(AccordionContext);

   return <span>{indexes.includes(index) ? CloseIcon : OpenIcon}</span>;
}

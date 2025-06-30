import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import { AccordionContext } from '../Accordion';
import clsx from 'clsx';
import './AccordionItems.scss';

export interface AccordionButtonProps {
   /** Item Index */
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
 * ```tsx
 * <AccordionButton index={0}>Click me</AccordionButton>
 * ```
 */
export function AccordionButton({
   index,
   className,
   children,
   ...props
}: AccordionButtonProps & React.ComponentPropsWithoutRef<'div'>) {
   const { handleItemClick, indexes } = React.useContext(AccordionContext);

   const ref = React.useRef<HTMLDivElement>(null);

   const KeyDown: React.ComponentProps<'div'>['onKeyDown'] = (e) => {
      const keyCode = e.key;
      const focusItem = (offset: number) => {
         const parent = ref.current?.parentElement;
         const next = parent?.querySelector<HTMLElement>(
            `[data-index="${index + offset}"]`
         );
         next?.focus();
      };

      switch (keyCode) {
         case 'Enter':
         case ' ':
            e.preventDefault(); // Prevent scroll or other default actions
            handleItemClick(index);
            break;

         case 'ArrowDown':
            e.preventDefault();
            focusItem(1);
            break;

         case 'ArrowUp':
            e.preventDefault();
            focusItem(-1);
            break;

         default:
            break;
      }
   };

   return (
      <div
         className={clsx('Accordion-header', className)}
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

export interface AccordionContentType {
   /** Item Index */
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
 * ```tsx
 * <AccordionContent index={0}>Item content</AccordionContent>
 * ```
 */
export function AccordionContent({
   index,
   className,
   children,
   ...props
}: AccordionContentType & React.ComponentPropsWithoutRef<'div'>) {
   const nodeRef = React.useRef(null);

   const { indexes } = React.useContext(AccordionContext);

   return (
      <CSSTransition
         in={indexes.includes(index)}
         timeout={200}
         classNames={'content-animation'}
         nodeRef={nodeRef}
         mountOnEnter
         unmountOnExit
      >
         <div
            className={clsx('Accordion-content', className)}
            ref={nodeRef}
            {...props}
         >
            {children}
         </div>
      </CSSTransition>
   );
}

export interface AccordionIconType {
   /** Item Index */
   index: number;
   /** Icon Component when Item is open */
   OpenIcon: React.ReactNode;
   /** Icon Component when Item is Closed */
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
 * ```tsx
 * <AccordionIcon
 *   index={0}
 *   OpenIcon={<i className="fas fa-chevron-up" />}
 *   CloseIcon={<i className="fas fa-chevron-down" />}
 * />
 * ```
 */
export function AccordionIcon({
   index,
   CloseIcon,
   OpenIcon,
   className,
   ...props
}: AccordionIconType & React.ComponentPropsWithoutRef<'span'>) {
   const { indexes } = React.useContext(AccordionContext);
   const isOpen = indexes.includes(index);
   return (
      <span
         className={clsx(
            'Accordion-icon',
            isOpen && 'Accordion-icon--open',
            className
         )}
         {...props}
      >
         {indexes.includes(index) ? CloseIcon : OpenIcon}
      </span>
   );
}

import * as React from 'react';
import { optionType } from './hooks/useSelect';
import clsx from 'clsx';

/**
 * Props for the `Options` component.
 *
 * Used internally by the custom `Select` component to render a list of selectable options.
 *
 * @property focusedIndex - Index of the currently keyboard-focused option.
 * @property selectedOption - The option that is currently selected.
 * @property filteredOptions - List of options filtered based on the search input.
 * @property toggle - Function to close the dropdown.
 * @property selectValue - Callback to update the selected option.
 * @property setFocusedIndex - Callback to update the focused index (e.g., during hover or keyboard navigation).
 */
export interface OptionsProps extends React.ComponentPropsWithoutRef<'option'> {
   /** Index of the currently focused option (used for keyboard navigation). */
   focusedIndex: number;
   /** Currently selected option object (if any). */
   selectedOption: optionType | undefined;
   /** Array of filtered options to be displayed in the dropdown. */
   filteredOptions: optionType[];
   /** Toggles the visibility of the dropdown list. */
   toggle: () => void;
   /** Sets the currently selected option value. */
   selectValue: (value: string) => void;
   /** Updates the currently focused index (for highlighting). */
   setFocusedIndex: (value: number) => void;
}

/**
 * Options component used by the custom `Select` dropdown.
 *
 * Renders a scrollable, keyboard-navigable list of filtered options.
 * Supports ARIA accessibility roles for screen readers and WAI-ARIA compliance.
 * Highlights the focused and selected option, and updates selection via mouse or keyboard.
 *
 * @returns A `<ul>` listbox with dynamically rendered `<li>` options.
 *
 * @example
 * <Options
 *   selectedOption={selectedOption}
 *   filteredOptions={filteredOptions}
 *   focusedIndex={focusedIndex}
 *   toggle={toggle}
 *   selectValue={selectValue}
 *   setFocusedIndex={setFocusedIndex}
 * />
 */

const Options = ({
   selectedOption,
   filteredOptions,
   focusedIndex,
   toggle,
   selectValue,
   setFocusedIndex,
}: OptionsProps) => {
   const activeDescendantId = React.useId();
   const scrollRef = React.useRef<HTMLUListElement>(null);

   React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
         if (scrollRef.current) {
            if (event.key === 'ArrowUp') {
               event.preventDefault(); // Prevent default browser scroll
               scrollRef.current.scrollTop -= 50; // Scroll up by 50px
            } else if (event.key === 'ArrowDown') {
               event.preventDefault(); // Prevent default browser scroll
               scrollRef.current.scrollTop += 50; // Scroll down by 50px
            }
         }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
         document.removeEventListener('keydown', handleKeyDown);
      };
   }, []);

   return (
      <ul
         ref={scrollRef}
         className="options"
         role="listbox"
         aria-activedescendant={activeDescendantId}
         tabIndex={-1}
      >
         {filteredOptions.map((option, index) => {
            const isSelected = selectedOption
               ? selectedOption.value === option.value
               : false;
            const isActive = focusedIndex === index;
            const optionId = `custom-option-${option.value}`;
            return (
               <li
                  id={optionId}
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  className={clsx(`optionItem`, {
                     active: isActive,
                  })}
                  onMouseEnter={() => setFocusedIndex(index)}
                  tabIndex={-1}
                  onClick={() => {
                     selectValue(option.value);
                     toggle();
                  }}
               >
                  {option.label}
               </li>
            );
         })}
      </ul>
   );
};

export default Options;

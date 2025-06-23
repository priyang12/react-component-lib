import * as React from 'react';
import { optionType } from './hooks/useSelect';
import clsx from 'clsx';

export interface OptionsProps extends React.ComponentPropsWithoutRef<'option'> {
   focusedIndex: number;
   selectedOption: optionType | undefined;
   filteredOptions: optionType[];
   toggle: () => void;
   selectValue: (value: string) => void;
   setFocusedIndex: (value: number) => void;
}

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

   console.log(focusedIndex);

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

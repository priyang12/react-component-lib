import React, { useState, useEffect } from 'react';

export interface optionType {
   label: string;
   value: string;
}

/**
 * Props for initializing the `useSelect` hook.
 */
export interface UseSelectProps {
   initialValue: string;
   options: optionType[];
}

/**
 * A custom React hook for managing the logic of a searchable/selectable dropdown.
 *
 * Features:
 * - Tracks selected value and search term.
 * - Filters options based on search input.
 * - Manages keyboard navigation (up/down/enter/escape).
 * - Returns ARIA-compatible index/focus state for accessibility.
 * - Provides a reset method to revert to initial state.
 *
 * @param {UseSelectProps} props - Initial props for the select hook.
 * @returns {object} Select state and handlers.
 */
export function useSelect({ initialValue, options }: UseSelectProps) {
   const [value, setValue] = useState(initialValue);
   const [filteredOptions, setFilteredOptions] = useState(options);
   const [searching, setSearching] = useState(false);
   const [searchTerm, setSearchTerm] = useState('');
   const [focusedIndex, setFocusedIndex] = useState(0);

   const selectedOption = options.find((opt) => opt.value === value);

   useEffect(() => {
      const matches = options.filter((option) =>
         option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredOptions(matches);
      setFocusedIndex(0);
   }, [searchTerm, options]);

   const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setValue(event.target.value);
   };

   const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
      setSearching(true);
   };

   const selectValue = (value: string) => {
      setValue(value);
      setSearchTerm('');
      setSearching(false);
   };

   const onKeyDown = (e: KeyboardEvent) => {
      if (!filteredOptions.length) return;
      if (e.key === 'ArrowDown') {
         e.preventDefault();
         setFocusedIndex((prev) => (prev + 1) % filteredOptions.length);
      } else if (e.key === 'ArrowUp') {
         e.preventDefault();
         setFocusedIndex((prev) =>
            prev === 0 ? filteredOptions.length - 1 : prev - 1
         );
      } else if (e.key === 'Enter') {
         e.preventDefault();
         const selected = filteredOptions[focusedIndex];
         if (selected) selectValue(selected.value);
      } else if (e.key === 'Escape') {
         setSearching(false);
         setSearchTerm('');
      }
   };

   const reset = () => {
      setValue(initialValue);
      setSearchTerm('');
      setSearching(false);
      setFocusedIndex(0);
   };

   return {
      value,
      focusedIndex,
      searching,
      searchTerm,
      selectedOption,
      selectValue,
      onChange,
      onSearchChange,
      onKeyDown,
      setFocusedIndex,
      reset,
      options: filteredOptions,
   };
}

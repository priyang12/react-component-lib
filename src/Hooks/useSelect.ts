import React, { useState, useEffect } from 'react';

export interface optionType {
   label: string;
   value: string;
}

export interface UseSelectProps {
   initialValue: string;
   options: optionType[];
}

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
      if (event.target.value === '') setSearching(false);
      else setSearching(true);
   };

   const selectValue = (value: string) => {
      setValue(value);
      setSearchTerm('');
      setSearching(false);
   };

   // need to fix this.
   const onKeyDown = (e: React.KeyboardEvent) => {
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

   // add reset fn
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
      options: filteredOptions,
   };
}

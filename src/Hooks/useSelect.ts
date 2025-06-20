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

   useEffect(() => {
      const matches = options.filter((option) =>
         option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(matches);
   }, [searchTerm]);

   const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setValue(event.target.value);
   };

   const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
      if (event.target.value === '') setSearching(false);
      else setSearching(true);
   };

   const SelectValue = (value: string) => {
      setValue(value);
      setSearchTerm('');
      setSearching(false);
   };

   return {
      value,
      SelectValue,
      searching,
      onChange,
      searchTerm,
      onSearchChange,
      options: filteredOptions,
   };
}

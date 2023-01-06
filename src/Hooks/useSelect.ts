import React, { useState, useEffect } from 'react';

interface UseSelectProps {
   initialValue: string;
   options: string[];
}

export function useSelect({ initialValue, options }: UseSelectProps) {
   const [value, setValue] = useState(initialValue);
   const [filteredOptions, setFilteredOptions] = useState(options);
   const [searching, setSearching] = useState(false);
   const [searchTerm, setSearchTerm] = useState('');

   useEffect(() => {
      const matches = options.filter(option =>
         option.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(matches);
   }, [searchTerm]);

   const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setValue(event.target.value);
   };

   const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
      setSearching(true);
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

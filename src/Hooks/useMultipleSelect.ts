import React from 'react';
import { useSelect } from './useSelect';

interface UseMultipleSelectProps {
   initialValue: string[];
   options: string[];
}

export const useMultipleSelect = ({
   initialValue,
   options,
}: UseMultipleSelectProps) => {
   const [SelectedArray, setSelectedArray] = React.useState(initialValue);
   const [Options, setOptions] = React.useState(options);
   const {
      SelectValue,
      onChange,
      onSearchChange,
      options: FilteredOptions,
      searchTerm,
      searching,
   } = useSelect({
      initialValue: SelectedArray[0],
      options: Options,
   });

   const addItem = (item: string) => {
      setSelectedArray([...SelectedArray, item]);
      setOptions(Options.filter(i => i !== item));
   };

   const removeItem = (item: string) => {
      setSelectedArray(SelectedArray.filter(i => i !== item));
      setOptions([...Options, item]);
   };

   return {
      searching,
      searchTerm,
      SelectedArray,
      options: FilteredOptions,
      SelectValue,
      onChange,
      onSearchChange,
      addItem,
      removeItem,
   };
};

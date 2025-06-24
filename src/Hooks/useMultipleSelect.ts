import React from 'react';
import { useSelect } from '../lib/Components/Select';
import { optionType } from '../lib/Components/Select/hooks/useSelect';

interface UseMultipleSelectProps {
   initialValue: optionType[];
   options: optionType[];
}

export const useMultipleSelect = ({
   initialValue,
   options,
}: UseMultipleSelectProps) => {
   const [SelectedArray, setSelectedArray] = React.useState(initialValue);
   const [Options, setOptions] = React.useState(options);
   const {
      selectValue,
      onChange,
      onSearchChange,
      options: FilteredOptions,
      searchTerm,
      searching,
   } = useSelect({
      initialValue: SelectedArray[0].value,
      options: Options,
   });

   const addItem = (item: optionType) => {
      setSelectedArray([...SelectedArray, item]);
      setOptions(Options.filter((i) => i.value !== item.value));
   };

   const removeItem = (item: optionType) => {
      setSelectedArray(SelectedArray.filter((i) => i.value !== item.value));
      setOptions([...Options, item]);
   };

   return {
      searching,
      searchTerm,
      SelectedArray,
      options: FilteredOptions,
      selectValue,
      onChange,
      onSearchChange,
      addItem,
      removeItem,
   };
};

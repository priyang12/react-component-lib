import React from 'react';

export function useToggle(initialValue = false) {
   const [Value, setValue] = React.useState(initialValue);
   const ToggleValue = React.useCallback(() => setValue(prev => !prev), []);
   const SetValue = React.useCallback((Value: boolean) => setValue(Value), []);
   return [Value, ToggleValue, SetValue] as const;
}

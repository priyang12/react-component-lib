import * as React from 'react';

export function useToggle(initialValue = false) {
   const [value, setValue] = React.useState(initialValue);
   const toggleValue = React.useCallback(() => setValue((prev) => !prev), []);
   const setToggleValue = React.useCallback(
      (Value: boolean) => setValue(Value),
      []
   );
   return { value, toggleValue, setToggleValue };
}

import * as React from 'react';

/**
 * A custom hook to manage boolean toggle state.
 *
 * @param initialValue - The initial boolean value. Defaults to `false`.
 *
 * @returns An object containing:
 * - `value`: The current boolean state.
 * - `toggleValue`: A function to toggle the state between `true` and `false`.
 * - `setToggleValue`: A function to explicitly set the state to `true` or `false`.
 *
 * @example
 * ```tsx
 * const { value, toggleValue, setToggleValue } = useToggle(true);
 *
 * return (
 *   <button onClick={toggleValue}>
 *     {value ? 'On' : 'Off'}
 *   </button>
 * );
 * ```
 */
export function useToggle(initialValue = false) {
   const [value, setValue] = React.useState(initialValue);
   const toggleValue = React.useCallback(() => setValue((prev) => !prev), []);
   const setToggleValue = React.useCallback(
      (Value: boolean) => setValue(Value),
      []
   );
   return { value, toggleValue, setToggleValue };
}

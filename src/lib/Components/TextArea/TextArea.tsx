import * as React from 'react';
import { clsx } from 'clsx';
import './TextArea.scss';
import { useFormContext } from '../FormControl/FormControl';
import { callAll } from '../../Utils/AllFunctionsCall';

/**
 * Props for the `TextArea` component.
 *
 * Extends native `<textarea>` props and integrates with `FormControl` context for validation and accessibility.
 *
 * @property size - Controls the size of the textarea. Options are `'small'`, `'medium'`, or `'large'`.
 * @property resize - Controls the CSS `resize` behavior of the textarea. Options are `'none'`, `'both'`, `'horizontal'`, or `'vertical'`.
 */
export interface TextAreaProps
   extends React.ComponentPropsWithoutRef<'textarea'> {
   /** size of the textarea: `'small'`, `'medium'`, or `'large'`. Determines rows and columns. */
   size: 'small' | 'medium' | 'large';
   /** CSS resize behavior: `'none'`, `'both'`, `'horizontal'`, or `'vertical'`. */
   resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

/**
 * Multiline `TextArea` input component integrated with `FormControl` context.
 *
 * Automatically handles validation via `inputChange` and `onFocus` callbacks from context.
 * Supports customizable sizing and resize behavior.
 *
 * @returns A styled `<textarea>` element.
 *
 * @example
 * ```tsx
 * <TextArea size="medium" resize="vertical" placeholder="Enter your message..." />
 * ```
 */
function TextArea({ resize, ...props }: TextAreaProps) {
   const {
      size,
      className,
      onChange: propOnChange,
      onFocus: propOnFocus,
      ...restProps
   } = props;
   const { alert, inputChange, onFocus } = useFormContext();
   const TextAreaClass = clsx(size, alert && 'Alert-Border', className);

   return (
      <textarea
         className={TextAreaClass}
         rows={size === 'small' ? 3 : size === 'medium' ? 5 : 10}
         cols={size === 'small' ? 20 : size === 'medium' ? 30 : 50}
         onChange={callAll(propOnChange, inputChange)}
         onFocus={callAll(propOnFocus, onFocus)}
         style={{ resize: resize }}
         {...restProps}
      />
   );
}

export default TextArea;

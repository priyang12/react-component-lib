import * as React from 'react';
import { clsx } from 'clsx';
import './TextArea.scss';
import { useFormContext } from '../FormControl/FormControl';
import { callAll } from '../../Utils/AllFunctionsCall';

export interface TextAreaProps
   extends React.ComponentPropsWithoutRef<'textarea'> {
   Size: 'small' | 'medium' | 'large';
   resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

/**
 * TextArea is a functional component that renders a textarea element with customizable size, alert, and resize options.
 * It also has the ability to use the FormControlContext to call inputChange and onFocus functions.
 *
 * @param {Object} props - The props for the TextArea component.
 * @param {'small' | 'medium' | 'large'} props.Size - The size of the textarea.
 * @param {boolean | string} props.alert - If true, the textarea will have a red border. If it is a string, the textarea will have a red border and the string will be displayed as a title attribute.
 * @param {'none' | 'both' | 'horizontal' | 'vertical'} props.resize - The resize option for the textarea.
 * @return {ReactElement} - The rendered textarea element.
 */
function TextArea({ resize, ...props }: TextAreaProps) {
   const {
      Size,
      className,
      onChange: propOnChange,
      onFocus: propOnFocus,
      ...restProps
   } = props;
   const { alert, inputChange, onFocus } = useFormContext();
   const TextAreaClass = clsx(Size, alert && 'Alert-Border', className);

   return (
      <textarea
         className={TextAreaClass}
         rows={Size === 'small' ? 3 : Size === 'medium' ? 5 : 10}
         cols={Size === 'small' ? 20 : Size === 'medium' ? 30 : 50}
         onChange={callAll(propOnChange, inputChange)}
         onFocus={callAll(propOnFocus, onFocus)}
         style={{ resize: resize }}
         {...restProps}
      />
   );
}

export default TextArea;

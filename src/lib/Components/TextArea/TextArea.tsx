import * as React from 'react';
import { clsx } from 'clsx';
import './TextArea.scss';
import { callAll } from '../../Utils/AllFunctionsCall';
import { FormControlContext } from '../../Module/FormControl/FormControl';

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
function TextArea(
   props: {
      Size: 'small' | 'medium' | 'large';
      alert?: boolean | string;
      resize?: 'none' | 'both' | 'horizontal' | 'vertical';
   } & React.ComponentPropsWithoutRef<'textarea'>
) {
   const { Size, alert, className, ...rest } = props;
   const TextAreaClass = clsx(Size, alert && 'Alert-Border', className);
   const { inputChange, onFocus } = React.useContext(FormControlContext);
   return (
      <textarea
         className={TextAreaClass}
         rows={Size === 'small' ? 3 : Size === 'medium' ? 5 : 10}
         cols={Size === 'small' ? 20 : Size === 'medium' ? 30 : 50}
         style={{ resize: props.resize }}
         onChange={callAll(props.onChange, inputChange)}
         onFocus={callAll(props.onFocus, onFocus)}
         {...rest}
      />
   );
}

export default TextArea;

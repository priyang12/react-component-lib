import * as React from 'react';
import { cx } from '@chakra-ui/utils';
import './TextArea.scss';
import { callAll } from '../../Utils/AllFunctionsCall';
import { FormControlContext } from '../../Module/FormControl/FormControl';

function TextArea(props: {
   Size: 'small' | 'medium' | 'large';
   alert?: boolean | string;
   resize?: 'none' | 'both' | 'horizontal' | 'vertical';
   [x: string]: any;
}): React.ReactElement<HTMLFormElement> {
   const { Size, alert, className, ...rest } = props;
   const TextAreaClass = cx(Size, alert && 'Alert-Border', className);
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

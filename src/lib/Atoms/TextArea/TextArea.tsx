import * as React from 'react';
import './TextArea.scss';

function TextArea(props: {
   Size: 'small' | 'medium' | 'large';
   alert?: boolean | string;
   resize?: 'none' | 'both' | 'horizontal' | 'vertical';
   [x: string]: any;
}): React.ReactElement<HTMLFormElement> {
   const { Size, alert, ...rest } = props;

   return (
      <textarea
         className={`${Size} ${alert ? 'Alert-Border' : ''}`}
         rows={Size === 'small' ? 3 : Size === 'medium' ? 5 : 10}
         cols={Size === 'small' ? 20 : Size === 'medium' ? 30 : 50}
         style={{ resize: props.resize }}
         {...rest}
      />
   );
}

export default TextArea;

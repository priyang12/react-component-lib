import * as React from 'react';
import Input from '../../Atoms/Input';
import Label from '../../Atoms/Label';
import TextArea from '../../Atoms/TextArea';
import { cx } from '@chakra-ui/utils';
import { callAll } from '../../Utils/AllFunctionsCall';
import './FormControl.scss';

export type FormControl = {
   style?: React.CSSProperties;
   overlay?: boolean;
   check?: boolean;
   className?: string;
   children?: React.ReactNode;
};

function FormControl({
   style,
   overlay,
   check,
   children,
   className,
   ...restProps
}: FormControl) {
   const FormControlClass = cx('form-control', className);
   const [LabelCheck, setLabelCheck] = React.useState(false);
   const [Alert, setAlert] = React.useState('');
   const inputChange = (e: React.FormEvent<HTMLInputElement> | any) => {
      if (e.target.value.length > 0) {
         setLabelCheck(true);
         setAlert('');
      } else {
         setLabelCheck(false);
         setAlert('value is required');
      }
   };

   const onFocus = () => {
      setLabelCheck(true);
   };
   return (
      <div className={FormControlClass} style={style} {...restProps}>
         {React.Children.map(children, (child: any) => {
            switch (child.type) {
               case Label:
                  return React.cloneElement(child, {
                     alert: Alert,
                     className: cx(
                        child.props.className,
                        LabelCheck && 'active',
                        overlay && 'overlay'
                     ),
                     'data-valid': LabelCheck,
                  });
               case TextArea:
                  return React.cloneElement(child, {
                     alert: Alert ? true : false,
                     onChange: callAll(child.props.onChange, inputChange),
                     onFocus: onFocus,
                  });
               case Input:
                  return React.cloneElement(child, {
                     alert: Alert ? true : false,
                     onChange: callAll(child.props.onChange, inputChange),
                     onFocus: onFocus,
                  });
               default:
                  return child;
            }
         })}
      </div>
   );
}
export default FormControl;

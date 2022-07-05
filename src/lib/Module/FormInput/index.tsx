import * as React from 'react';
import Input from '../../components/Input';
import Label from '../../components/Label';
import { callAll } from '../../Utils/AllFunctionsCall';
import './FormInput.scss';
function FormInput({ style, overlay, check, children, ...restProps }: any) {
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
      <div className="form-control" style={style} {...restProps}>
         {React.Children.map(children, (child) => {
            switch (child.type) {
               case Label:
                  return React.cloneElement(child, {
                     alert: Alert,
                     className: `${child.props.className} ${
                        LabelCheck ? 'active' : ''
                     } ${overlay && 'over-label'}`,
                     'data-valid': LabelCheck,
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
export default FormInput;

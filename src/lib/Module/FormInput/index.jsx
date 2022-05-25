import React, { useState } from 'react';
import Input from '../../components/Input';
import Label from '../../components/Label';
import './FormInput.scss';
function FormInput({ style, overlay, check }) {
   // Late Look
   // return (React.createElement("div", { className: "form-input" },
   //     React.createElement(Label, null, "Form Input"),
   //     React.createElement(Input, { style: style, overlay: overlay, check: check })));
   const [LabelCheck, setLabelCheck] = useState(false);

   return (
      <div className="form-control" style={style}>
         <Label
            htmlFor="Search"
            className={`${overlay && 'over-label'}`}
            data-valid={LabelCheck}
         >
            Search
         </Label>
         <Input
            type="text"
            id="Search"
            style={{
               width: '100%',
            }}
            onChange={(e) => {
               if (e.target.value.length > 0) {
                  setLabelCheck(true);
               } else {
                  setLabelCheck(false);
               }
            }}
            onFocus={() => {
               setLabelCheck(true);
            }}
            required
         />
      </div>
   );
}
export default FormInput;

import * as React from 'react';

import './DatePicker.scss';

function DatePicker({ children, ...props }: { children?: React.ReactNode }) {
   return (
      <div className="datePicker" {...props}>
         {children}
      </div>
   );
}
export default DatePicker;

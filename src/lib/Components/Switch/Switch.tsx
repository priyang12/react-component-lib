import { clsx } from 'clsx';
import * as React from 'react';

import './Switch.scss';

const Switch = ({
   isOn,
   setIsOn,
   width = '50px',
   ...props
}: {
   isOn: boolean;
   setIsOn: () => void;
   width: string;
} & React.ComponentPropsWithoutRef<'label'>) => {
   const LabelClassName = clsx('switch-label', props.className);
   return (
      <div className="switch-container" onClick={() => setIsOn()}>
         <input className="switch" type="checkbox" checked={isOn} />
         <label className={LabelClassName} {...props}></label>
      </div>
   );
};

export default Switch;

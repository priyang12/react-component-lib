import * as React from 'react';
import { IoMdClose } from 'react-icons/io';
import { usePopContext } from './PopContainer';
import { Button } from '../../Button';

export interface popClosePorps extends React.ComponentPropsWithoutRef<'div'> {}
const PopClose = ({ ...props }: popClosePorps) => {
   const { setContentState } = usePopContext();
   return (
      <div {...props} onClick={() => setContentState(false)}>
         <Button variant="primary-border">
            <IoMdClose />
         </Button>
      </div>
   );
};

export default PopClose;

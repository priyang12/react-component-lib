import React from 'react';
import Button from '../../components/Button/Button';
import { chakra } from '@chakra-ui/system';
import './Search.scss';

function Search({ SearchBtnHide, children, ...props }: any) {
   // Maybe Later Debounce Search Input Can Be Used
   return (
      <chakra.div className="search-container" {...props}>
         {React.Children.map(children, (child) => {
            if (child.type === 'button' || child.type === Button) {
               return React.cloneElement(child, {
                  className: `search-btn ${SearchBtnHide ? 'hide' : ''}`,
               });
            }
            return child;
         })}
      </chakra.div>
   );
}
export default Search;

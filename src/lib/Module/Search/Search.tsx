import React from 'react';
import Button from '../../Atoms/Button/Button';
import { cx } from '@chakra-ui/utils';
import './Search.scss';

function Search({
   SearchBtnHide,
   children,
   ...props
}: {
   SearchBtnHide?: boolean;
   children?: React.ReactNode;
}) {
   const { className } = props as any;
   const SerachClass = cx('search-container', SearchBtnHide, className);
   return (
      <div className={SerachClass} {...props}>
         {React.Children.map(children, (child: any) => {
            if (child.type === 'button' || child.type === Button) {
               return React.cloneElement(child, {
                  className: `search-btn ${SearchBtnHide ? 'hide' : ''}`,
               });
            }
            return child;
         })}
      </div>
   );
}
export default Search;

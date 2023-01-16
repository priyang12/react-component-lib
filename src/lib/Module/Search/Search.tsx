import React from 'react';
import { Button } from '../../Atoms/Button';
import { clsx } from 'clsx';
import './Search.scss';

interface SearchProps {
   SearchBtnHide?: boolean;
   LabelComponent: React.ReactNode;
   InputComponent: React.ReactNode;
}

function Search({
   SearchBtnHide,
   LabelComponent,
   InputComponent,
   children,
   className,
   ...props
}: SearchProps & React.ComponentPropsWithoutRef<'form'>) {
   const SerachClass = clsx('search-container', className);
   const BtnClass = clsx('search-btn', SearchBtnHide ? 'hide' : null);

   return (
      <form className={SerachClass} {...props}>
         {LabelComponent}
         {InputComponent}
         <Button variant="primary-border" className={BtnClass}>
            Search
         </Button>
      </form>
   );
}
export default Search;

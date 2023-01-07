import React from 'react';
import Button from '../../Atoms/Button/Button';
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
   ...props
}: SearchProps & React.ComponentPropsWithoutRef<'form'>) {
   const { className } = props as any;
   const SerachClass = clsx('search-container', SearchBtnHide, className);

   return (
      <form className={SerachClass} {...props}>
         {LabelComponent}
         {InputComponent}
         <Button variant="primary" className="search-btn">
            Search
         </Button>
      </form>
   );
}
export default Search;

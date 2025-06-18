import React from 'react';
import { Button } from '../../Components/Button';
import { clsx } from 'clsx';
import './Search.scss';
import { AiOutlineClose } from 'react-icons/ai';

export interface SearchProps {
   SearchBtnHide?: boolean;
   clearTextFn?: () => void;
   clearText?: boolean;
   LabelComponent: React.ReactNode;
   InputComponent: React.ReactNode;
}

function Search({
   SearchBtnHide,
   LabelComponent,
   InputComponent,
   clearText,
   clearTextFn,
   children,
   className,
   ...props
}: SearchProps & React.ComponentPropsWithoutRef<'form'>) {
   const SerachClass = clsx('search-container', className);
   const BtnClass = clsx('search-btn', SearchBtnHide ? 'hide' : null);
   return (
      <form className={SerachClass} {...props}>
         {LabelComponent}
         <div className="flex relative">
            {InputComponent}
            {clearText ? (
               <Button
                  style={{
                     padding: '0',
                  }}
                  variant="primary-border"
                  onClick={clearTextFn}
                  className="absolute right-[5%] p-0 top-[25%]"
               >
                  <AiOutlineClose />
               </Button>
            ) : null}
         </div>

         <Button variant="primary-border" className={BtnClass}>
            Search
         </Button>
      </form>
   );
}
export default Search;

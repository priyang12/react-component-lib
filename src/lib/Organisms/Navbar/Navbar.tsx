import * as React from 'react';
import { clsx } from 'clsx';
import './Navbar.scss';

export type NavbarType = {
   LogoComponent: React.ReactNode;
   MiddleComponent: React.ReactNode;
   LastComponent: React.ReactNode;
   SkipNav?: boolean;
   SkipNavComponent?: any;
};

function SkipNavbar({ id = 'Skip' }) {
   return (
      <div>
         <a href={`#${id}`} className="SkipNavbar">
            Skip Navigation
         </a>
      </div>
   );
}

function Navbar({
   LogoComponent,
   SkipNav,
   SkipNavComponent,
   MiddleComponent,
   LastComponent,
   ...props
}: NavbarType & React.ComponentPropsWithoutRef<'nav'>) {
   const NavbarClass = clsx('Navbar');
   return (
      <nav className={NavbarClass} {...props}>
         <div className="logo">{LogoComponent}</div>
         {SkipNav ? (
            SkipNavComponent ? (
               <>
                  {React.cloneElement(SkipNavComponent, {
                     className: clsx(
                        SkipNavComponent.props.className,
                        'SkipNavbar'
                     ),
                     tabIndex: 0,
                  })}
               </>
            ) : (
               <SkipNavbar />
            )
         ) : null}
         <div>{MiddleComponent}</div>
         <div>{LastComponent}</div>
         <div id="Skip" className="hidden"></div>
      </nav>
   );
}
export default Navbar;

import * as React from 'react';
import { clsx } from 'clsx';
import './Navbar.scss';

export type NavbarType = {
   LogoComponent: React.ReactNode;
   MiddleComponent: React.ReactNode;
   LastComponent: React.ReactNode;
};

function Navbar({
   LogoComponent,
   MiddleComponent,
   LastComponent,
   ...props
}: NavbarType & React.ComponentPropsWithoutRef<'nav'>) {
   const NavbarClass = clsx('Navbar');
   return (
      <nav className={NavbarClass} {...props}>
         <div className="logo">{LogoComponent}</div>
         <div>{MiddleComponent}</div>
         <div>{LastComponent}</div>
      </nav>
   );
}
export default Navbar;

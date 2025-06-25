import * as React from 'react';
import { usePopContext } from './PopContainer';

export interface PopContent extends React.ComponentPropsWithoutRef<'div'> {}

const PopContent = ({ children, ...props }: PopContent) => {
   const { showContent } = usePopContext();
   return <div {...props}>{showContent ? <>{children}</> : null}</div>;
};

export default PopContent;

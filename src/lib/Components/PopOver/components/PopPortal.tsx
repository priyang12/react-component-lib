import * as React from 'react';
import { createPortal } from 'react-dom';
import { usePopContext } from './PopContainer';

export interface PopPortalProps {
   children: React.ReactNode;
   container?: HTMLElement | null;
}

const PopPortal = ({ children, container = document.body }: PopPortalProps) => {
   const { showContent } = usePopContext();

   if (!showContent || !container) return null;

   return createPortal(children, container);
};

export default PopPortal;

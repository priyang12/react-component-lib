import React from 'react';
import clsx from 'clsx';
import './TextLink.scss';

export interface TextLinkProps
   extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
   /** Underline behavior: always, hover, or none */
   underline?: 'always' | 'hover' | 'none';
   /** Color variant of the link */
   variant?: 'primary' | 'secondary' | 'muted';
   /** If true, opens the link in a new tab with appropriate security attributes */
   external?: boolean;
}

/**
 * TextLink component renders a styled inline link with underline and color variants.
 * Supports secure external linking and dark mode styling.
 */
const TextLink = ({
   underline = 'hover',
   variant = 'primary',
   external = false,
   className,
   children,
   ...props
}: TextLinkProps) => {
   return (
      <a
         className={clsx(
            'TextLink',
            `TextLink--${variant}`,
            `TextLink--underline-${underline}`,
            className
         )}
         target={external ? '_blank' : undefined}
         rel={external ? 'noopener noreferrer' : undefined}
         {...props}
      >
         {children}
      </a>
   );
};

export default TextLink;

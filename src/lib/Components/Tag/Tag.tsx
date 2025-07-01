import * as React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import clsx from 'clsx';
import './Tag.scss';
import { VariantType } from '../interface';
import { callAll } from '../../Utils/AllFunctionsCall';

/**
 * Props for the Tag component.
 *
 * Extends standard HTML div props and allows additional customization for color, variant, icons, and close behavior.
 *
 * @property color - Custom background color of the tag. Overrides default variant styling if provided.
 * @property variant - Visual style of the tag. Supports filled and bordered variants such as `'primary'`, `'info-border'`, etc.
 * @property icon - Optional icon to render on the left side of the tag content.
 * @property onClose - Callback function invoked when the close icon is clicked.
 * @property closeIcon - Custom close icon node or `true` to use the default close icon.
 */
export interface TagProps extends React.ComponentPropsWithoutRef<'div'> {
   /** Custom background color for the tag. Overrides the variant background if provided. */
   color: string;
   /** Visual style variant of the tag, e.g., 'primary', 'success-border'. */
   variant?: VariantType;
   /** Optional leading icon displayed before the tag content. */
   icon?: React.ReactNode;
   /** Function called when the tag's close icon is clicked. */
   onClose?: (e: React.MouseEvent<HTMLElement>) => void;
   /** Close icon element or `true` to use the default icon (AiOutlineClose). */
   closeIcon?: React.ReactNode | boolean;
}

/**
 * Tag component visually labels content with optional icons, color, and dismiss functionality.
 *
 * Supports predefined style variants (e.g., 'primary', 'success-border') or custom background colors.
 * Optionally renders a leading icon and a close button that removes the tag from the UI.
 *
 * @example
 * ```tsx
 * <Tag variant="info" closeIcon>Info Tag</Tag>
 * ```
 *
 * @example
 * ```tsx
 * <Tag color="#f0ad4e" icon={<StarIcon />}>Custom Color</Tag>
 * ```
 */
function Tag({
   color,
   variant,
   icon,
   closeIcon,
   onClose,
   className,
   style,
   children,
   ...props
}: TagProps) {
   const [closeTag, setCloseTag] = React.useState(false);
   const removeTag = () => setCloseTag(true);
   if (closeTag) return null;
   return (
      <div
         className={clsx('Tag', variant && `Tag--${variant}`, className)}
         style={{ backgroundColor: color, ...style }}
         {...props}
      >
         {icon ? icon : null}
         {children}
         {closeIcon ? (
            <span
               aria-label="close"
               tabIndex={-1}
               role="img"
               onClick={callAll(onClose, removeTag)}
            >
               {typeof closeIcon === 'boolean' ? <AiOutlineClose /> : closeIcon}
            </span>
         ) : null}
      </div>
   );
}

export default Tag;

import { cx } from '@chakra-ui/utils';
import './ButtonGroup.scss';

export interface IButtonGroupProps {
   className?: string;
   withIcon?: boolean;
   children: React.ReactNode;
}

function ButtonGroup({
   children,
   withIcon,
   className,
   ...props
}: IButtonGroupProps & React.HTMLAttributes<HTMLDivElement>): any {
   const ButtonGroupClass = cx(
      'ButtonGroup',
      className,
      withIcon && 'ButtonGroup__icon'
   );
   return (
      <div className={ButtonGroupClass} {...props}>
         {children}
      </div>
   );
}

export default ButtonGroup;

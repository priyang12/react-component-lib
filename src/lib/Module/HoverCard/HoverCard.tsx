import React, { useContext, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import debounce from 'lodash.debounce';
import './HoverCard.scss';

export const CardContext = React.createContext(
   {} as {
      Show: boolean;
      setShow: React.Dispatch<React.SetStateAction<boolean>>;
      debouncedHandleMouseEnter: () => void;
      handleOnMouseLeave: () => void;
      cancelDebounce: () => void;
   }
);

CardContext.displayName = 'CardContext';

function CardWrapper({ children }: { children: React.ReactNode }) {
   const [Show, setShow] = useState(false);

   const debouncedHandleMouseEnter = useMemo(
      () =>
         debounce(() => {
            setShow(true);
         }, 1000),
      [setShow]
   );

   const handleOnMouseLeave = () => {
      setShow(false);
   };

   const cancelDebounce = () => {
      debouncedHandleMouseEnter.cancel();
   };

   return (
      <CardContext.Provider
         value={{
            Show,
            setShow,
            debouncedHandleMouseEnter,
            handleOnMouseLeave,
            cancelDebounce,
         }}
      >
         {children}
      </CardContext.Provider>
   );
}

function CardImage({
   PreviewTitle,
   className,
   children,
}: {
   PreviewTitle: string;
   className?: string;
   children?: React.ReactNode;
}) {
   const { cancelDebounce, debouncedHandleMouseEnter } = useContext(
      CardContext
   );
   const CardImageClassName = clsx('preview-img', className);
   return (
      <div
         className={CardImageClassName}
         style={
            {
               '--content': PreviewTitle,
            } as React.CSSProperties
         }
         onMouseOver={debouncedHandleMouseEnter}
         onMouseLeave={cancelDebounce}
      >
         {children}
      </div>
   );
}

function CardBottom({ children, ...props }: any) {
   const CardBottomClassName = clsx('card-bottom', props.className);
   return (
      <div className={CardBottomClassName} {...props}>
         {children}
      </div>
   );
}

const HiddenCard = ({
   children,
   className,
}: {
   children: React.ReactNode;
   className?: string;
}) => {
   const HiddenCardClassName = clsx('hidden-card', className);
   const { handleOnMouseLeave, Show } = useContext(CardContext);
   return (
      <div
         className={HiddenCardClassName}
         style={{
            display: `${!Show ? 'none' : 'flex'}`,
         }}
         onMouseLeave={handleOnMouseLeave}
      >
         {children}
      </div>
   );
};

export interface HoverCardProps extends React.HTMLAttributes<HTMLElement> {
   PreviewTitle: string;
   className?: string;
}

function HoverCard({ className, children, ...props }: HoverCardProps) {
   const CardClasses = clsx('card', className);
   const { Show, cancelDebounce } = useContext(CardContext);
   return (
      <article className={CardClasses} {...props}>
         <div
            className="preview-card"
            style={{
               display: !Show ? '' : 'none',
            }}
            onMouseLeave={cancelDebounce}
         >
            {children}
         </div>
      </article>
   );
}

export { HoverCard, CardBottom, CardImage, CardWrapper, HiddenCard };

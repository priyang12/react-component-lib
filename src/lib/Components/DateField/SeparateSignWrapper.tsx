import * as React from 'react';

export function SeparateSignWrapper({
   separateSign,
   ShouldSeparate,
   children,
   index,
}: {
   index: number;
   separateSign: string;
   ShouldSeparate: boolean;
   children: React.ReactNode;
}) {
   if (ShouldSeparate && index === 1) {
      return (
         <>
            <span className="separate-sign">{separateSign}</span>
            {children}
            <span className="separate-sign">{separateSign}</span>
         </>
      );
   } else {
      return <>{children}</>;
   }
}

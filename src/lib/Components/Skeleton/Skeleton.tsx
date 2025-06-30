import * as React from 'react';
import clsx from 'clsx';
import './Skeleton.scss';

export interface SkeletonProps extends React.ComponentPropsWithoutRef<'div'> {}

function Skeleton({ className, ...props }: SkeletonProps) {
   return <div className={clsx('skeleton', className)} {...props}></div>;
}

export default Skeleton;

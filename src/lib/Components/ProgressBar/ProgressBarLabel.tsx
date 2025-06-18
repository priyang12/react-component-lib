import clsx from 'clsx';

type ProgressBarLabelProps = {
   label: string;
   placement?: string;
   className?: string;
};

export default function ProgressBarLabel({
   label,
   //  add styling
   placement,
   className,
}: ProgressBarLabelProps) {
   return <span className={clsx('ProgressBar-label', className)}>{label}</span>;
}

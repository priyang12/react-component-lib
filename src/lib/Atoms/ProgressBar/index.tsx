import { ProgressBar, ProgressBarLabel } from './ProgressBar';
import { withChakraProps } from '../../Utils/withChakraProps';

const Bar = withChakraProps(ProgressBar);
const Label = withChakraProps(ProgressBarLabel);

export { Bar as ProgressBar, Label as ProgressBarLabel };
